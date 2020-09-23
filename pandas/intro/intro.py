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
print("====================================")
listConstr = [
    {'a': 1, 'b': 2, 'c': 3},
    {'a': 4, 'b': 5, 'c': 6}
]
df = pd.DataFrame(listConstr)
print(df)

#try lists w columns specified later
print("====================================")
lists = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
df = pd.DataFrame(lists, columns=['a' ,'b', 'c'])
print(df)

#cast df as numpy arr
print("====================================")
print(df.to_numpy(copy=True)) #use this for access to optional dtype/copy params
print(df.values)

#mess w data types of objects in data frame
print("====================================")
print(df.dtypes)
df = df.astype(dtype={'a': np.int32, 'c': np.float64})
print(df); print(df.dtypes)

#getting elems: 4 accessors: .loc[], .iloc[], .at[], .iat[]
print("====================================")
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
df = df.astype(dtype={"age": np.int32, "py-score": np.float64})

print(df)
print(df["name"])
print(df.loc[100])
print(df.loc[100:102, ["name", "city"]])
print(df.iloc[0:2, 0:1]) #note that iloc is exclusive stop
print(df.iat[0, 0])
print(df.at[100, "name"])

#setting data w/ accessors
print("====================================")
df.iloc[:3, 1] = ["Mex City", "Tor", "Pra"]
print(df)
df.iloc[3:, 1] = ["Shang", "Manchest", "Cai", "Osa"]
print(df)

#inserting into df
print("====================================")
me = pd.Series(data=["Tony", "NYC", 22, 100], index=df.columns,
    name=100+len(source))
print(me)
newDf = df.append(me) #keep in mind df wont be modified, op will return new obj
print(newDf)
newDf.drop(labels=100+len(source), inplace=True) #inplace only exists for drop
print(newDf)

#inserting/deleting columns same as dict ops
print("====================================")
df["zeroed"] = 0
print(df)
del df["zeroed"]
print(df)
df.insert(loc=3, column="zeroed", value=0) #use .insert for specific loc insert
print(df)
print(df.pop("zeroed"))
print(df)

#arithmetic ops
print("====================================")
print(df["py-score"]/100)

#applying numpy averages
print("====================================")
df["randScore"] = 50
print(df)
#one new thing to me is no trailing zeroes printed
print(np.average(df.loc[:, ["py-score", "randScore"]], axis=1))

print("====================================")
df = pd.read_csv("data.csv", index_col=0)
print(df, "\n")
df.sort_values(by="java-score", ascending=False, inplace=True) #remember inplace
print(df)

#filtering data (this is p cool)
print("====================================")
filter = df["java-score"] >= 80; print(filter)
print(df[filter])
#keep in mind NOT(~), AND(&), OR(|), XOR(^) can be concatenated to return Series
filter = (df["java-score"] >= 80) & (df["py-score"] >= 81); print(filter)
print(df[filter])
filter = (df["java-score"] >= 80) | (df["py-score"] >= 80); print(filter)
print(df[filter])
filter = (df["java-score"] >= 80) ^ (df["py-score"] >= 80); print(filter)
print(df[filter])
filter = ~(df["java-score"] >= 80) & ~(df["py-score"] >= 80); print(filter)
print(df[filter])

print(df["java-score"].where(cond=df["java-score"] >= 70, other=70.0))

#determining stats
print("====================================")
print(df.describe(), '\n')    #this is super cool
print(df.mean(), '\n')
print(df.describe().loc["mean"])    #thought this might work and wanted to check
print(df.describe()["age"])         #more logic checks


#missing data
print("====================================")
missingDF = pd.DataFrame({"x": [1, 2, np.nan, 4]})
print(missingDF, '\n')
print(missingDF.mean())
correctDF = pd.DataFrame({"x": [1, 2, np.nan, 4]}).fillna(value=10)
print(correctDF, '\n')
print(correctDF.mean())
#keep in mind .fillna(method="ffil"), .fillna(method="bfill"), .interpolate()
#.dropna() also an option to drop invalid data
