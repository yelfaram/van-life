// import { useState, useEffect } from "react"
import { redirect } from "react-router-dom"

export async function requireAuth(request) {
    // fake auth
    const authData = JSON.parse(localStorage.getItem("authData")) || {};
    const { loggedIn, userType } = authData;
    const pathname = new URL(request.url).pathname
    if (!loggedIn) {
        throw redirect(`/login?message=You must be logged in as a host&redirectTo=${pathname}`)
    }

    if (userType === "host") {
        return null
    } else if (userType === "renter") {
        throw redirect('/unauthorized')
    }

    return null
}