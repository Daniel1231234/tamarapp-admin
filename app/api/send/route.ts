import clientPromise from "@/lib/mongodb"

export async function POST(req: Request) {
    try {
        const { name, phone, note, imageUrl, mediaType, youtubeUrl } = await req.json()



        const updatedPhone = phone.startsWith('0') ? phone.substring(1) : phone;

        const client = await clientPromise
        const db = client.db("notes_db")


        const newNote = await db.collection('notes').insertOne({
            name,
            message: note,
            img: mediaType === "image" ? imageUrl : null,
            youtubeUrl: mediaType === "video" ? extractVideoId(youtubeUrl) : null,
            seenAt: null,
            phone: updatedPhone
        })

        return new Response(JSON.stringify(newNote))
    } catch (err) {
        return new Response('Something went wrong')
    }

}

function extractVideoId(url: string): string | null {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
        return match[1];
    }
    return null;
}