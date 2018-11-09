def can_create(words, s):
    d = [False] * len(s) #It is an array that contains booleans
    #d[i] is True if there is a word in the dictionary that ends at ith index of s AND d is also True at the beginning of the word
    for i in range(len(s)):
        for w in words:
            if w == s[i-len(w)+1:i+1] and (d[i-len(w)] or i-len(w) == -1):
                d[i] = True
    print (d[-1])         
       

can_create(['back','end','front', 'tree'],"backend")
can_create(['back','end','front', 'tree'],"frontend")
can_create(['back','end','front', 'tree'],"frontyard")
