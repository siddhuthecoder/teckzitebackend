import requests

base_url = 'http://localhost:4000/user/delete/'

# Range of user IDs to delete
start_id = 1115
end_id = 1117   

for i in range(start_id, end_id + 1):
    user_id = f'tzk24{i}'
    delete_url = base_url + user_id
    response = requests.delete(delete_url)
    if response.status_code == 200:
        print(f"User {user_id} deleted successfully")
    else:
        print(f"Failed to delete user {user_id}. Status code: {response.status_code}")
