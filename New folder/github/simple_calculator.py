# # simple calculator
# def add(a,b):
#     return a+b
# def sub(a,b):
#     return a-b
# def mul(a,b):
#     return a*b
# def div(a,b):
#     if b==0:
#         return "cannot divide by zero"
#     return a/b 

# while(True):
    
#     print("simple calculator")
#     print("1.addition")
#     print("2.substraction")
#     print("3.multiplication")
#     print("4.division")
#     print("5.exit")

#     choice =int(input("enter your choice(1-5): "))
        
#     if choice in range(1,5):
        
#         a=int(input("enter the value of a:"))
#         b=int(input("enter the value of b:"))

#         if choice==1:
#             print("result:",add(a,b))
            
#         elif choice==2:
#             print("result:",sub(a,b))
#         elif choice==3:
#             print("result:",mul(a,b))
#         elif choice==4:
#             print("result:",div(a,b))
#         else:
#             print("exit from the calculator")
#             break
# ```python
# from functools import reduce

# # Example: Using reduce to find the sum of a list
# numbers = [1, 2, 3, 4, 5]
# result = reduce(lambda x, y: x + y, numbers)



# try:
#     a=int(input("a:"))
#     b=int(input("b:"))
#     print(c=a/b)
# except Exception as e:
#     print(f"divide by zero not possible{e}")
# else:
#     print("no error")
# file=open("meee.txt","a")
# file.write("rakshitha is a student")
# file.write("naveen")

# file.close()

# try:
#     with open("meee.txt","r") as file:
#         content=file.read()
# except Exception as e:
#     print(f"error {e}")
# else:
#     print(content)
# finally:
#     print("file closed")

# while True:
    # a=int(input("enter the value of a:"))

    # # b=int(input("enter the value of b:"))
    # # if a<b:
    # #     print("a is smaller than b")
    # # elif a>b:
    # #     print("a is greater than b")
    # # else:
    # #     print("a is equal to b")
    # if a%2==0:
    #     print("a is even")
    # else:
    #     print("a is odd")
# N=int(input("enter the value of N:"))
# count=1
# sum=0
# sum+=count
# print(sum)
# count+=1
# if count<=N:
#     continue
# else:
#     break
while True:
    N=int(input("enter the value of N:"))
    count=1
    sum=0
    
    print(sum)
    sum+=count
    count+=1
    if count<=N:
        continue


