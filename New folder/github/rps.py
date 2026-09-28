import random
while True:
    choice=int(input("enter the value of choice(1=rock,2=paper,scissor):"))
    comp_choice=random.randint(1,3)
    if choice==comp_choice:
        print("tie")
    elif choice==1 and comp_choice==3:
        print("win")
    elif choice==2 and comp_choice==1:
        print("win")
    elif choice==3 and comp_choice==2:
        print("win")
    else:
        print("lose")
    print(comp_choice)