const URL = 'data url'

export async function GET(req) {
    return new Response(URL, {
        headers: {
            'Content-Type': 'video/mp4',
            'Content-Disposition': 'inline'
        }
    })
}