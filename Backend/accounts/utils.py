from firebase_admin import firestore
def write_activity(user_uid, payload):
    db = firestore.client()
    collection = db.collection('activity_logs').document(user_uid).collection('entries')
    collection.add(payload)