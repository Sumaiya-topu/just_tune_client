from flask import Flask, request, Response, jsonify
import os
import random
app = Flask(__name__)

# Create a global dictionary to store generated IDs
generated_ids = {}

@app.route('/api/generate_audio', methods=['POST'])
def generate_audio():
    try:
        unique_id = 1

        generated_ids[unique_id] = {}

        data = request.json

        # Extract input parameters for generating audio
        description = data.get('description')
        duration = data.get('duration')
        temp = data.get('temp')
        top_k = data.get('top_k')
        top_p = data.get('top_p')
        cfg_co = data.get('cfg_co')

        if not description or not isinstance(duration, (int, float)):
            return "Invalid input parameters", 400


        # Get a list of all WAV files in the "audio" folder
        audio_folder = 'audio'
        audio_files = [f for f in os.listdir(audio_folder) if f.endswith('.wav')]

        # Check if there are any audio files
        if not audio_files:
            return "No audio files found in the audio folder", 404

        # Choose a random audio file
        audio_file_name = random.choice(audio_files)
        audio_file_path = os.path.join(audio_folder, audio_file_name)

        if not os.path.isfile(audio_file_path):
            return "Audio file not found", 404

        with open(audio_file_path, 'rb') as audio_file:
            audio_binary = audio_file.read()

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

        id = data.get('id')

        if id in generated_ids:
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