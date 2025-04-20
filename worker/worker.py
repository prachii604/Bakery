import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
channel = connection.channel()
channel.queue_declare(queue='order_queue')

def callback(ch, method, properties, body):
    print(f"Received {body}")

channel.basic_consume(queue='order_queue', on_message_callback=callback, auto_ack=True)
channel.start_consuming()