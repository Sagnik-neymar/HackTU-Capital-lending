"use server"

import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

// checks if there is a current active user in session and whether it exists in our database and returns it
export const onAuthenticatedUser = async () => {
    try {
        const clerk = await currentUser()
        if (!clerk) return { status: 404 }

        const user = await client.user.findUnique({
            where: {
                clerkId: clerk.id,
            },
            select: {
                id: true,
                firstname: true,
                lastname: true,
                phoneNumber: true,
                panNumber: true,
            },
        })

        if (user)
            return {
                status: 200,
                id: user.id,
                name: `${user.firstname} ${user.lastname}`,
                phoneNumber: user.phoneNumber,
                panNumber: user.panNumber,
            }
        return {
            status: 404,
        }
    } catch (error) {
        console.error("Error in actions/auth.ts:", error)
        return {
            status: 400,
            message: "An error occured while fetching onAuthenticatedUser",
        }
    }
}

export const onSignUpUser = async (data: {
    firstname: string
    lastname: string
    clerkId: string
    panNumber: string
    phoneNumber: string
}) => {
    try {
        const createdUser = await client.user.create({
            data: {
                ...data,
            },
        })

        if (createdUser) {
            return {
                status: 200,
                message: "User successfully created",
                id: createdUser.id,
            }
        }

        return {
            status: 400,
            message:
                "User could not be created! Try again (error in onSignUpUser)",
        }
    } catch (error) {
        return {
            status: 400,
            message:
                "Oops! something went wrong. Try again (error in onSignUpUser)",
        }
    }
}

type checkProps = {
    phoneNumber: string
    panNumber: string
}

export const checkPanExist = async ({ phoneNumber, panNumber }: checkProps) => {
    // attempting to find user on which the pan or phone might already exist
    const pan = await client.pan.findFirst({
        where: {
            phoneNumber,
            panNumber,
        },
    })

    return pan
}

export const userAlreadyExist = async ({
    phoneNumber,
    panNumber,
}: checkProps) => {
    const checkUser = await client.user.findUnique({
        where: {
            panNumber,
            phoneNumber,
        },
    })
    if (checkUser)
        return {
            status: 200,
            message: "Successfully signed in",
            id: checkUser.id,
        }
}
