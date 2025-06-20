from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import pika
import json
import os
import time

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://bakery_user:bakery_pass@db:5432/bakery_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Models
class Product(db.Model):
    __tablename__ = 'bakery_products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('bakery_products.id'), nullable=False)
    status = db.Column(db.String(50), default='pending')

# RabbitMQ Connection Helper
def get_rabbitmq_connection():
    max_retries = 3
    retry_delay = 5
    
    for attempt in range(max_retries):
        try:
            connection = pika.BlockingConnection(
                pika.ConnectionParameters(
                    host=os.getenv('RABBITMQ_HOST', 'rabbitmq'),
                    port=int(os.getenv('RABBITMQ_PORT', 5672)),
                    credentials=pika.PlainCredentials(
                        os.getenv('RABBITMQ_DEFAULT_USER', 'guest'),
                        os.getenv('RABBITMQ_DEFAULT_PASS', 'guest')
                    ),
                    heartbeat=600,
                    blocked_connection_timeout=300
                )
            )
            return connection
        except pika.exceptions.AMQPConnectionError as e:
            if attempt == max_retries - 1:
                raise e
            time.sleep(retry_delay)
    return None

# Routes
@app.route('/')
def index():
    return jsonify({"message": "Welcome to Prachita's Bakery API!"})

@app.route('/products', methods=['GET'])
def list_products():
    products = Product.query.all()
    return jsonify([{"id": p.id, "name": p.name, "price": p.price} for p in products])

@app.route('/products', methods=['POST'])
def add_product():
    data = request.get_json()
    if not data or 'name' not in data or 'price' not in data:
        return jsonify({"error": "Missing product name or price"}), 400

    new_product = Product(name=data['name'], price=data['price'])
    db.session.add(new_product)
    db.session.commit()

    return jsonify({
        "message": "Product added!",
        "product": {
            "id": new_product.id,
            "name": new_product.name,
            "price": new_product.price
        }
    }), 201
# @app.route('/order', methods=['GET', 'POST'])
# def order_operations():
#     if request.method == 'POST':
#         data = request.json
#         if not data or 'product_id' not in data:
#             return jsonify({"error": "Missing product_id"}), 400

#         product = Product.query.get(data['product_id'])
#         if not product:
#             return jsonify({"error": "Product not found"}), 404

#         new_order = Order(product_id=data['product_id'])
#         db.session.add(new_order)
#         db.session.commit()

#         # 🔁 Publish the order to RabbitMQ
#         try:
#             connection = get_rabbitmq_connection()
#             channel = connection.channel()
#             channel.queue_declare(queue='order_queue', durable=True)
#             channel.basic_publish(
#                 exchange='',
#                 routing_key='order_queue',
#                 body=json.dumps({'order_id': new_order.id}),
#                 properties=pika.BasicProperties(delivery_mode=2)  # make message persistent
#             )
#             connection.close()
#             print(f" [>] Published order {new_order.id} to RabbitMQ")
#         except Exception as e:
#             print(f" [!] Failed to publish order to RabbitMQ: {e}")

#         return jsonify({
#             "message": "Order placed successfully!",
#             "order_id": new_order.id
#         }), 201




# @app.route('/order', methods=['GET', 'POST'])
# def order_operations():
#     if request.method == 'POST':
#         data = request.json
#         if not data or 'product_id' not in data:
#             return jsonify({"error": "Missing product_id"}), 400

#         product = Product.query.get(data['product_id'])
#         if not product:
#             return jsonify({"error": "Product not found"}), 404

#         new_order = Order(product_id=data['product_id'])
#         db.session.add(new_order)
#         db.session.commit()

#         return jsonify({
#             "message": "Order placed successfully!", 
#             "order_id": new_order.id
#         }), 201
    
#     elif request.method == 'GET':
#         orders = Order.query.all()
#         return jsonify([
#             {
#                 "order_id": order.id,
#                 "product_id": order.product_id,
#                 "status": order.status
#             } 
#             for order in orders
#         ])


@app.route('/order', methods=['GET', 'POST'])
def order_operations():
    if request.method == 'POST':
        data = request.json
        if not data or 'product_id' not in data:
            return jsonify({"error": "Missing product_id"}), 400

        product = Product.query.get(data['product_id'])
        if not product:
            return jsonify({"error": "Product not found"}), 404

        new_order = Order(product_id=data['product_id'])
        db.session.add(new_order)
        db.session.commit()

        # ✅ ADDING ONLY THIS BLOCK to send to RabbitMQ
        try:
            connection = get_rabbitmq_connection()
            channel = connection.channel()
            channel.queue_declare(queue='order_queue', durable=True)
            channel.basic_publish(
                exchange='',
                routing_key='order_queue',
                body=json.dumps({'order_id': new_order.id}),
                properties=pika.BasicProperties(delivery_mode=2)
            )
            connection.close()
            print(f" [>] Published order {new_order.id} to RabbitMQ")
        except Exception as e:
            print(f" [!] Failed to publish order to RabbitMQ: {e}")

        return jsonify({
            "message": "Order placed successfully!", 
            "order_id": new_order.id
        }), 201

    elif request.method == 'GET':
        orders = Order.query.all()
        return jsonify([
            {
                "order_id": order.id,
                "product_id": order.product_id,
                "status": order.status
            } 
            for order in orders
        ])


@app.route('/order/<int:order_id>', methods=['GET'])
def check_order_status(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404
    return jsonify({
        "order_id": order.id, 
        "status": order.status
    })

@app.route('/order/<int:order_id>', methods=['PUT'])
def update_order_status(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"error": "Order not found"}), 404

    data = request.get_json()
    if 'status' not in data:
        return jsonify({"error": "Missing status"}), 400

    order.status = data['status']
    db.session.commit()

    return jsonify({"message": "Order status updated successfully!"})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

