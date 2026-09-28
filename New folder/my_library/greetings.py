# from currency_converter import CurrencyConverter
# c=CurrencyConverter()
# amt=float(input("enter the ammount in USD:"))
# new_amt=c.convert(amt,"USD","INR")
# print(f"the new amt is : {new_amt}")

from color_generator import color,generate
color=generate()
print(color)
color=generate("colorless")
print(color.rgb)
