                                          // distance btwn the points
// #include<stdio.h>
// #include<math.h>
// void main()
// {
//     float x1,y1,x2,y2,distance;
//     printf("enter the value for x1 and y1 (coefficients of 1st quadrants):");
//     scanf("%f%f",&x1,&y1);
//     printf("enter the value for x2 and y2 (coefficients of 1st quadrants):");
//     scanf("%f%f",&x2,&y2);
//     distance=sqrt(pow((x2-x1),2)+pow((y2-y1),2));
//     printf("the distance between two points on the stright line is:%.2f\n",distance);
// }
                                        // result checking
// #include<stdio.h>
// void main()
// {
//     int marks;
//     printf("enter the student marks (0 to 100):");
//     scanf("%d",&marks);

//     if (marks<0 || marks>100)
//     printf("invalid marks!,enter the marks from 0 to 100");

//     else if (marks>=90)
//     printf("grade:A");
//     else if (marks>=80)
//     printf("grade:B");
//     else if (marks>=70)
//     printf("grade:C");
//     else if (marks>=60)
//     printf("grade:D");

//     else
//     printf("grade:F");

// }

                                       //id verification
// #include<stdio.h>
// int main()
// {
//     int id,choice;
//     printf("===kyc verification===");
//     printf("1.ADHAR number\n");
//     printf("2.APPAR number\n");
//     printf("3.PAN number\n");
//     printf("4.driving license number\n");
//     printf("5.passport number\n");

//     printf("enter the choice between 1 to 5:");
//     scanf("%d",&choice);

//     if(choice<1 || choice>5)
//     {
//         printf("invalid choice!,please enter the choice between 1 to 5");
//         return 0;
//     }
//     printf("enter the unique id number:");
//     scanf("%d",&id);
//     switch(choice)
//     {
//         case 1:
//         if (id==123456)
//         printf("ADHAR verified sucessfully!");
//         else
//         printf("invalid id");
//         break;

//         case 2:
//         if (id==112233)
//         printf("APPAR verified sucessfully!");
//         else
//         printf("invalid id");
//         break;

//         case 3:
//         if (id==667788)
//         printf("PAN verified sucessfully!");
//         else
//         printf("invalid id");
//         break;

//         case 4:
//         if (id==998877)
//         printf("DRIVING LICENSE verified sucessfully!");
//         else
//         printf("invalid id");
//         break;
        
//         case 5:
//         if (id==101010)
//         printf("PASSPORT verified sucessfully!");
//         else
//         printf("invalid id");
//         break;

//     }
//     return 0;
// }
                                       //quadratic roots
// #include<stdio.h>
// #include<math.h>
// int main()
// {
//     float a,b,c,disc,root1,root2,real,imag;
//     printf("enter the coefficients of quadratic equation(a,b,c):");
//     scanf("%f%f%f",&a,&b,&c);

//     if (a==0 || b==0)
//     {
//         printf("invalid coefficients!");
//     }
//     else if (a==0)
//     {
//         root1=-c/b;
//         printf("linear equation with root:%.2f\n",root1);
//     }
//     else
//     {
//         disc=b*b-4*a*c;
//         printf("discriminant is:%.2f\n",disc);

//         if (disc>0)
//         {
//             root1=(-b+sqrt(disc))/(2*a);
//             root2=(-b-sqrt(disc))/(2*a);
//             printf("the roots are real and distinct: root1=%.2f\n and root2=%.2f\n",root1,root2);
//         }
//         else if (disc==0)
//         {
//             root1=-b/(2*a);
//             root2=root1;
//             printf("roots are real and equal:root1=%.2f\n anf root2=%.2f\n",root1,root2);
//         }
//         else
//         {
//             real=-b/(2*a);
//             disc=sqrt(fabs(disc))/(2*a);
//             printf("the roots are complex:root1=%.2f+%.2fi\n and root2=%.2f-%.2fi\n",real,imag,real,imag);
//         }
        

//     }
//     return 0;
// } 
                                               //angle of rotation
// #include<stdio.h>
// #include<math.h>
// #define PI 3.14
// void main()
// {
//     float sum,term,x,nume;
//     int deg,i=2,fact=1;
//     printf("enter the angle in deg:");
//     scanf("%d",&deg);
//     x=deg*(PI/180);
//     sum = x;
//     nume = x;

//     do{
//         fact = fact*i*(i+1);
//         nume= -nume*x*x;
//         term = nume/fact;
//         sum += term;
//         i += 2;

//     }
//     while(fabs(term)>0.001);
//     printf("approximated sin(%d):%.2f\n",deg,sum);
// }
                                    //searching of key word
// #include<stdio.h>
// #include<string.h>
// #define MAX 200
// void main()
// {
//     char description [MAX];
//     char keyword[50];

//     printf("enter the course description:");
//     fgets(description,sizeof(description),stdin);
//     description[strcspn(description,"\n")]='\0';

//     printf("enter the keyword to search:");
//     fgets(keyword,sizeof(keyword),stdin);
//     keyword[strcspn(keyword,"\n")]='\0';

//     if (strstr(description,keyword))
//     {
//         printf("keyword '%s' is present in the crs description\n");
//     }
//     else{
//         printf("keyword '%s' is not present in the crs description\n");
//     }

// }
                                           //student result checking(functions)
// #include<stdio.h>
// int ispassed (int m1,int m2,int m3)
// {
//     if (m1>=40 || m2>40 || m3>=40)
//     return 1;
//     else 
//     return 0;
// }
// void main()
// {
//     int sub1,sub2,sub3;
//     float average;
//     printf("enter the marks for sub1:");
//     scanf("%d",&sub1);
//     printf("enter the marks for sub2:");
//     scanf("%d",&sub2);
//     printf("enter the marks for sub3:");
//     scanf("%d",&sub3);
//     average =(sub1=sub2+sub3)/3.00;
//     printf("average=%.2f\n",average);
//     if (ispassed(sub1,sub2,sub3))
//         printf("result:pass\n");
//     else
//         printf("result:fail\n");

// }
                                        //account balance swaping
// #include<stdio.h>
// void swap(int*a,int*b)
// {
//     int temp=*a;
//     *a = *b;
//     *b = temp;
// } 
// void main()
// {
//     int balance1,balance2;
//     printf("enter the amount for acc1:");
//     scanf("%d",&balance1);
//     printf("enter the amount for acc2:");
//     scanf("%d",&balance2);
//     printf("\n before swaping\n");
//     printf("account1 balance : %d\n",balance1);
//     printf("account2 balance : %d\n",balance2);

//     swap(&balance1,&balance2);
//     printf("\n after swaping\n");
//     printf("account1 balance : %d\n",balance1);
//     printf("account2 balance : %d\n",balance2);

// }

                           // searching 
// #include<stdio.h>
// int main()
// {
//     int book[]={1,2,3,4,5,6,7,8,9,10,11,12,13,14};
//     int n=14;
//     int bookid,low=0,high=n-1,mid,found=0;
//     printf("enter the book id to search:");
//     scanf("%d",&bookid);
//     while(low<=high)
//     {
//     mid=(low+high)/2;
//         if (book[mid]==bookid)
//         {
//             found=1;
//             break;
//         }
//         else if (book[mid]<bookid)
        
//             low=mid+1;
        
//         else
//             high=mid-1;
        
//     }
//     if (found==1)
//         {printf("the bookid %d is available at the position %d.\n",bookid,mid);}
//     else
//         {printf("the bookid %d is not available",bookid);}

// return 0;

// }
                        //recording students score
// #include<stdio.h>
// int main()
// {
//     int scores[100],n,i,j,temp;
//     printf("enter the number of students:");
//     scanf("%d",&n);
//     printf("enter the scores of %d of students:",n);
//     for (i=0;i<n;i++)
//     {scanf("%d",&scores[i]);}
//     for(i=0;i<n-1;i++)
//     {
//         for(j=i+1;j<n;j++)
//         {
//             if (scores[i]<scores[j])
//             {
//                 temp=scores[i];
//                 scores[i]=scores[j];
//                 scores[j]=temp;
//             }
//         }
//     }
//     printf("the students scores in descending oredr is :\n");
//     for (i=0;i<n;i++)
//     {
//         printf("%d\n",scores[i]);
//     }
//     return 0;

// }
                                             //total revenue
// #include<stdio.h> 
// int main()
// {
//     int branches,products,i,j;
//     printf("enter the number of branches:");
//     scanf("%d",&branches);
//     printf("enter the number of products:");
//     scanf("%d",&products);
//     int units[branches][products];
//     int revenue[products];
//     printf("enter the number of units shifted by each brach for each products:");
//     for(i=0;i<branches;i++)
//     {
//         printf("branch %d units :\n",i+1);
//         for(j=0;j<products;j++)
//         {
//             printf("product %d units:\n",j+1);
//             scanf("%d",&units[i][j]);
//         }
//     }
//     printf("enter the revenue per unit for each produt:\n");
//     for(j=0;j<products;j++)
//     {
//         printf("product %d revenue :\n",j+1);
//         scanf("%d",&revenue[j]);
//     }
//     printf("total revenue per branch:\n");
//     for (i=0;i<branches;i++)
//     {
//         int total=0;
//         for (j=0;j<products;j++)
//         {
//             total+=units[i][j]*revenue[j];
//         }
//         printf("branch %d revenue:%d\n",i+1,total);
//     }
//     return 0;

// }
                                   //mobile function
// #include<stdio.h>
// int main()
// {
//    char first[50],last[50],full[100];
//    int i=0,j=0,length=0;
//    printf("enter the first name:");
//    scanf("%s",first);
//    printf("enter the last name:");
//    scanf("%s",last);
//    while(first[i]!='\0')
//    {
//     full[length++]=first[i++];
//    }
//    full[length++]=' ';

//     while(last[j]!='\0')
//    {
//     full[length++]=last[j++];
//    }
//    full[length++]='\0';
//    printf("the full name :%s\n",full);
//    printf("the total length:%d\n",length);
//    if(length>20)
//    {
//     printf("name do not fits the screen");
//    }
//    else
//    {
//     printf("name fits the screen");
//    }
//    return 0;
// }
                      //currency exchange
// #include<stdio.h> 
// void swapbyvalue(int a,int b)
// {
//     int temp=a;
//     a=b;
//     b=temp;
//     printf("preview swap(byvalue):%d %d\n",a,b);
// }
// void swapbyreference(int*a,int*b)
// {
//     int temp=*a;
//     *a=*b;
//     *b=temp;
//     printf("preview swap(byreference):%d %d\n",*a,*b);
// }
// int main()
// {
//     int x,y;
//     printf("enter the two currency values:\n");
//     scanf("%d %d",&x,&y);
    
//     swapbyvalue(x,y);
//     printf("after callbyvalue:%d%d\n",x,y);
//     swapbyreference(&x,&y);
//     printf("after callbyreference:%d%d\n",x,y);
//     return 0;
// }
                                          // lib book function
// #include<stdio.h>
// struct book
// {
//     char title[50];
//     char author[50];
//     int year;
// };
// int main()
// {
//     int n,i;
//     printf("enter the number of books:");
//     scanf("%d",&n);
//     getchar();

//     struct book booklist[n];
//     for(i=0;i<n;i++)
//     {
//         printf("\n enter the details for book %d:",i+1);
//         printf("title:\n");
//         fgets(booklist[i].title,sizeof(booklist[i].title),stdin);
        
//         printf("author:\n");
//         fgets(booklist[i].author,sizeof(booklist[i].author),stdin);

//         printf("published year:\n");
//         scanf("%d",&booklist[i].year);
//         getchar();
//     }
//     printf("\n lib book detail: ");
//     for (i=0;i<n;i++)
//     {
//         printf("book %d:\n",i+1);
//         printf("%s by %s (%d)\n",booklist[i].title,booklist[i].author,booklist[i].year);
//     }
//     return 0;


// }