from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/pollution')
def get_pollution():
    return jsonify([
        {"lat": 28.6139, "lng": 77.2090, "aqi": 120},
        {"lat": 28.7041, "lng": 77.1025, "aqi": 90}
    ])

@app.route('/api/transport')
def get_transport():
    return jsonify([
        {"route_id": "Bus A", "stops": ["Stop 1", "Stop 2", "Stop 3"]},
        {"route_id": "Bus B", "stops": ["Stop 4", "Stop 5", "Stop 6"]}
    ])

if __name__ == '__main__':
    app.run(debug=True)
