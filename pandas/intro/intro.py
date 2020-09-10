import pandas as pd


#testing out that dicts are now ordered in python 
test = {}
randNums = [4, 7, 2, 9, 3, 8, 6, 1]
for elem in randNums:
    test[elem] = [elem*10, elem*10+1, elem*10+2]
df = pd.DataFrame(test)
print(df)
