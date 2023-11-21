export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}