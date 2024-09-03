import json
import random

def modify_products_file(filename='products.json'):
    try:
        # Load the JSON data from the file
        with open(filename, 'r') as file:
            products = json.load(file)

        # Modify each product
        for product in products:
            # Replace keys
            product['Image'] = product.pop('image')
            product['desc'] = product.pop('description')
            product['Name'] = product.pop('title')
            product['Category'] = product.pop('category')
            product['Price'] = product.pop('price')

            # Remove the 'rating' field
            if 'rating' in product:
                del product['rating']

            # Add 'Quantity' key with a random value
            product['Quantity'] = random.randint(1, 100)  # Random quantity between 1 and 100

        # Save the modified data back to the file
        with open(filename, 'w') as file:
            json.dump(products, file, indent=4)

        print(f"Products modified and saved to {filename} successfully!")
    except IOError as e:
        print(f"Error modifying the products file: {e}")

if __name__ == "__main__":
    modify_products_file()
