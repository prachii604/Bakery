import pika
import time

def test_publish():
    try:
        # Connect to RabbitMQ (use the service name from docker-compose)
        connection = pika.BlockingConnection(
            pika.ConnectionParameters(
                host='rabbitmq',  # or 'localhost' if running outside Docker
                port=5672,
                credentials=pika.PlainCredentials('guest', 'guest')
            )
        )
        
        channel = connection.channel()
        
        # Declare the queue (same as in your app)
        channel.queue_declare(queue='order_queue', durable=True)
        
        # Publish test messages
        for i in range(5):
            message = f"Test message {i} at {time.time()}"
            channel.basic_publish(
                exchange='',
                routing_key='order_queue',
                body=message,
                properties=pika.BasicProperties(
                    delivery_mode=2  # make message persistent
                )
            )
            print(f" [x] Sent '{message}'")
            time.sleep(1)  # Add delay between messages
        
        connection.close()
        print("Test messages published successfully")
        
    except pika.exceptions.AMQPConnectionError as e:
        print(f"Connection failed: {e}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    test_publish()