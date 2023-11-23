// import { useState, useEffect } from "react"
import { redirect } from "react-router-dom"

export async function requireAuth(request) {
    // fake auth
    const isLoggedIn = localStorage.getItem("loggedIn")
    const pathname = new URL(request.url).pathname
    if (!isLoggedIn) {
        throw redirect(`/login?message=You must log in first&redirectTo=${pathname}`)
    }
    return null
}