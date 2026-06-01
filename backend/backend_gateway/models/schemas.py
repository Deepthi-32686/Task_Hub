from pydantic import BaseModel


class SignupSchema(BaseModel):
    fullname: str
    phone: str
    email: str
    password: str


class SigninSchema(BaseModel):
    username: str
    password: str


# NEW SCHEMA
class UserSchema(BaseModel):
    fullname: str
    phone: str
    email: str
    password: str
    role: int
    status: int