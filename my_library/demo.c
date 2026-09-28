                        // program 1
// #include<stdio.h>
// #include<math.h>
// void main()
// {
//     float x1,x2,y1,y2,distance;
//     printf("enter the x1 and y1 coordinate of the first point:\n");
//     scanf("%f%f",&x1,&y1);
//     printf("enter the x2 and y2 coordinate of the first point:\n");
//     scanf("%f%f",&x2,&y2);
//     distance = sqrt(pow((x2-x1),2)+pow((y2-y1),2));
//     printf("the distance between the stright line of two points is : %.2f\n",distance);
    
// }
                           // program 2
// #include<stdio.h>
// void main()
// {
//     int marks;
//     printf("enter the student marks(0 to 100):");
//     scanf("%d",&marks);
//         if (marks<0||marks>100)
//         printf("inavlaid marks,enter the marks between 0 to 100\n");
//         else if (marks>=90)
//             printf("grade:A\n");
//         else if (marks>=80)
//             printf("grade:B\n");
//         else if (marks>=70)
//             printf("grade:c\n");
//         else if (marks>=60)
//             printf("grade:d\n");
//         else 
//             printf("grade:f\n");

// }

                            // program 3

// #include<stdio.h>
// int main()
// {
//     int choice,id;
//     printf("===kyc verification===\n");
//     printf("1: AADHAR number\n");
//     printf("2: APPAR id \n");
//     printf("3: PAN number \n");
//     printf("4: driving licence number\n");
//     printf("5: passport number\n");

//     printf("enter the choice from(1 to 5):");
//     scanf("%d",&choice);
//     if (choice<1||choice>5)
//     {
//     printf("invalid choice,enter thr choice from 1 to 5");
//     return 0;
//     }
//     printf("enter the unique id number:\n");
//     scanf("%d",&id);
//     switch(choice)
//     {
//     case 1:
//         if (id == 123456)
//         printf("AADHAR verified");
//         else
//         printf("invalid aadhar id");
//         break;
//     case 2:
//         if (id == 112233)
//         printf("APPAR verified");
//         else
//         printf("invalid appar id");
//         break;
//     case 3:
//         if (id == 445566)
//         printf("PAN verified");
//         else
//         printf("invalid PAN id");
//         break;
//     case 4:
//         if (id == 778899)
//         printf("driving licence verified");
//         else
//         printf("invalid driving licence id");
//         break;
//     case 5:
//         if (id == 987654)
//         printf("passport verified");
//         else
//         printf("invalid passport id");
//         break;

//     }
// return 0;
// }

                              //  program 4
// #include<stdio.h>
// #include<math.h>
// int main()
// {
//     float a,b,c,root1,root2,disc,real,imag;
//     printf("enter the coefiicients of a quadratic equation(a,b,c): ");
//     scanf("%f%f%f",&a,&b,&c);

//     if (a==0 && b==0)
//     {
//     printf("invalid coefficients");
//     }

//     else if (a==0)
//     {
//         root1=-c/b;
//         printf("the linear equation with root :root1= %.2f\n",root1);

//     }
//     else
//     {
//         disc= b*b-4*a*c;
//         printf("the discriminant is: %.2f\n",disc);

//         if (disc >0)
//         {
//             root1=(-b+sqrt(disc))/(2*a);
//             root2=(-b-sqrt(disc))/(2*a);
//             printf("the roots are real and distinct:root1= %.2f and root2 = %.2f\n",root1,root2);

//         }
//         else if (disc=0)
//         {
//             root1 = -b/(2*a);
//             root2 = root1;
//             printf("the roots are real and equal: root1= %.2f and root2= %.2f\n",root1,root2);

//         }
//         else
//         {
//             real = -b/(2*a);
//             imag= sqrt(fabs(disc))/(2*a);
//             printf("the roots are complex: root1=%.2f+%.2fi and root2=%.2f-%.2fi",real,imag,real,imag);

//         }

        
//     }
//     return 0;

// }

                                //   program 5

// #include<stdio.h>
// #include<math.h>
// #define PI 3.14
// void main()
// {
//     float nume,term,sum,x;
//     int deg,i=2,fact=1;
//     printf("enter the angle in deg :");
//     scanf("%d",&deg);
//     x= deg*(PI/180);
//     sum = x;
//     nume = x;
    
//     do
//     {
//         fact = fact*i*(i+1);
//         nume= -nume*x*x;
//         term = nume/fact;
//         sum+=term;
//         i+=2;
//     }
//     while(fabs(term)>0.001);
//     {
//     printf("the approximated sin(%d): %.2f\n",deg,sum);
//     }
// }
                              // program 6
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
//     printf("the keyword('%s') is found in the course description");
//     else
//     printf("keyword('%s') not found in the course description");

// }
                                   //program 7
// #include<stdio.h>
// int ispassed(int m1,int m2,int m3)
// {
//     if (m1>=40 && m2>=40 && m3>=40)
//     return 1;
//     else
//     return 0;
// }
// void main()
// {
//     int sub1,sub2,sub3;
//     float average;
//     printf("enter the marks in sub1:");
//     scanf("%d",&sub1);
//     printf("enter the marks in sub2:");
//     scanf("%d",&sub2);
//     printf("enter the marks in sub3:");
//     scanf("%d",&sub3);
//     average=(sub1+sub2+sub3)/3.0;
//     printf("the avrage of the 3 sub is: %.2f\n",average);

//     if (ispassed(sub1,sub2,sub3))
//     printf("result:PASS\n");
//     else
//     printf("result:FAIL");
// }
                                   //program 8
                                   
// #include<stdio.h>
// void swap(int*a,int*b)
// {
//     int temp = *a;
//     *a = *b;
//     *b = temp;

// }
// void main()
// {
// int balance1,balance2;
// printf("enter the balance for acc1: ");
// scanf("%d",&balance1);
// printf("enter the balance for acc2: ");
// scanf("%d",&balance2);
// printf("\nbefore swaping\n");
// printf("acc1 balance is: %d\n",balance1);
// printf("acc2 balance is : %d\n",balance2);

// swap(&balance1,&balance2);
// printf("after swaping\n");
// printf("acc1 balance is: %d\n",balance1);
// printf("acc2 balance is : %d\n",balance2);

// }
                            