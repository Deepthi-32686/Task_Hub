from fastapi import APIRouter, Header
from models.schemas import SigninSchema, SignupSchema, UserSchema

import httpx

router = APIRouter(prefix="/authservice")

SPRING_URL = "http://localhost:8001/"


# ================= SIGNUP =================

@router.post("/signup")
async def signup(U: SignupSchema):

    async with httpx.AsyncClient() as client:
        response = await client.post(
            SPRING_URL + 'user/signup',
            json=U.model_dump()
        )

    return response.json()


# ================= SIGNIN =================

@router.post("/signin")
async def signin(U: SigninSchema):

    async with httpx.AsyncClient() as client:
        response = await client.post(
            SPRING_URL + 'user/signin',
            json=U.model_dump()
        )

    return response.json()


# ================= USER INFO =================

@router.get("/uinfo")
async def uinfo(Token: str = Header(...)):

    async with httpx.AsyncClient() as client:
        response = await client.get(
            SPRING_URL + 'user/uinfo',
            headers={"Token": Token}
        )

    return response.json()


# ================= PROFILE =================

@router.get("/profile")
async def getProfile(Token: str = Header(...)):

    async with httpx.AsyncClient() as client:
        response = await client.get(
            SPRING_URL + 'user/profile',
            headers={"Token": Token}
        )

    return response.json()


# ================= GET ALL USERS =================

@router.get("/getallusers/{PAGE}/{SIZE}")
async def getAllUsers(PAGE: int, SIZE: int, Token: str = Header(...)):

    async with httpx.AsyncClient() as client:
        response = await client.get(
            SPRING_URL + f'user/getallusers/{PAGE}/{SIZE}',
            headers={"Token": Token}
        )

    return response.json()


# ================= SAVE USER =================

@router.post("/saveuser")
async def saveUser(data: UserSchema, Token: str = Header(...)):

    async with httpx.AsyncClient() as client:
        response = await client.post(
            SPRING_URL + 'user/saveuser',
            json=data.model_dump(),
            headers={"Token": Token}
        )

    return response.json()