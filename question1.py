import re
from collections import Counter

regex = r"(?<=\<).+?(?=\>)"
userList = []
unique_list = []
userCount = []
userDict = {}
with open('chats.txt', 'r+') as f:
     data = f.read().replace('\n', '')
     userList = re.findall(regex, data, re.MULTILINE)
for x in userList:
    if x not in unique_list:
        unique_list.append(x)
for user in unique_list:
    if userList.count(user):
        userCount.append(userList.count(user))   
userDict = dict(zip(unique_list,userCount))
top3 = dict(Counter(userDict).most_common(3))
print(top3)  
        
   
