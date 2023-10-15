from flask import Flask, request, Response, jsonify
import os

app = Flask(__name__)

# Create a global dictionary to store generated IDs
generated_ids = {}

@app.route('/api/generate_audio', methods=['POST'])
def generate_audio():
    try:
        # Generate a unique ID (you can use a UUID or any other unique identifier)
        unique_id = 1

        # Store the generated ID
        generated_ids[unique_id] = {}

        # Get the JSON data from the request body
        data = request.json

        # Extract input parameters for generating audio
        description = data.get('description')
        duration = data.get('duration')
        temp = data.get('temp')
        top_k = data.get('top_k')
        top_p = data.get('top_p')
        cfg_co = data.get('cfg_co')

        # Validate the input
        if not description or not isinstance(duration, (int, float)):
            return "Invalid input parameters", 400

        # Process the input parameters as needed (you can generate audio based on these parameters)

        # For demonstration purposes, let's assume you have a pre-existing "dummy.wav" file
        audio_file_path = 'audio/1.wav'

        # Check if the file exists
        if not os.path.isfile(audio_file_path):
            return "Audio file not found", 404

        # Read the binary data from the audio file
        with open(audio_file_path, 'rb') as audio_file:
            audio_binary = audio_file.read()

        # Set the response headers for WAV content
        headers = {
            'Content-Type': 'audio/wav',
            'Content-Disposition': 'attachment; filename=generated.wav'
        }

        return Response(audio_binary, headers=headers, status=200)

    except Exception as e:
        return str(e), 400

@app.route('/api/get_response_data', methods=['POST'])
def get_response_data():
    try:
        # Get the JSON data from the request body
        data = request.json

        # Extract input parameters
        id = data.get('id')

        # Check if the provided ID exists in the generated_ids dictionary
        if id in generated_ids:
            # Process the input parameters and generate response data
            response_data = {
                'id': id,
                'min_frequency': 50,
                'max_frequency': 2000,
                'avg_frequency': 500
            }

            # Return response data
            return jsonify(response_data), 200
        else:
            return "Invalid ID", 400

    except Exception as e:
        return str(e), 400

if __name__ == '__main__':
    app.run(debug=True)

