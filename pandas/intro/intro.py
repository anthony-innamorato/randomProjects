#following tutorials on realpython.org

import pandas as pd
import numpy as np


#testing out that dicts are now ordered in python 3.8
test = {}
randNums = [4, 7, 2, 9, 3, 8, 6, 1]
for elem in randNums:
    test[elem] = [elem*10, elem*10+1, elem*10+2]
df = pd.DataFrame(test)
print(df)

#try w list of dicts
listConstr = [
    {'a': 1, 'b': 2, 'c': 3},
    {'a': 4, 'b': 5, 'c': 6}
]
df = pd.DataFrame(listConstr)
print(df)

#try lists w columns specified later
lists = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
df = pd.DataFrame(lists, columns=['a' ,'b', 'c'])
print(df)

#cast df as numpy arr
print(df.to_numpy(copy=True))    #use this for access to optional dtype & copy params
print(df.values)

#mess w data types of objects in data frame
print(df.dtypes)
df = df.astype(dtype={'a': np.int32, 'c': np.float64})
print(df); print(df.dtypes)

#getting elems: 4 accessors: .loc[], .iloc[], .at[], .iat[]
source = np.array([
    ['Xavier', 'Mexico City', 41, 88.0],
    ['Ann', 'Toronto', 28, 79.0],
    ['Jana', 'Prague', 33, 81.0],
    ['Yi', 'Shanghai', 34, 80.0],
    ['Robin', 'Manchester', 38, 68.0],
    ['Amal', 'Cairo', 31, 61.0],
    ['Nori', 'Osaka', 37, 84.0]
])
sourceCols = ["name", "city", "age", "py-score"]
sourceRows = [elem for elem in range(100, 100+len(source))]
df = pd.DataFrame(source, columns=sourceCols, index=sourceRows)
print(df)
print(df["name"])
print(df.loc[100])
