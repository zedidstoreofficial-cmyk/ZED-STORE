from flask import Flask, request, jsonify
from flask_cors import CORS
from ff_full_info import gather_full_info

app = Flask(__name__)
CORS(app)

@app.route('/api/ff/info', methods=['GET'])
def get_ff_info():
    uid = request.args.get('uid')
    region = request.args.get('region', 'IND')
    
    if not uid or not uid.isdigit():
        return jsonify({"error": "Invalid or missing UID"}), 400
    
    try:
        report = gather_full_info(int(uid), region)
        if report.get("ok"):
            return jsonify(report["summary"])
        else:
            return jsonify({"error": "Failed to fetch info"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
