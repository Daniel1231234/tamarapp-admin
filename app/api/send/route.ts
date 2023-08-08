import clientPromise from "@/lib/mongodb"
import axios from "axios";

export async function POST(req: Request) {
    try {
        const { name, phone, note, imageUrl, mediaType, youtubeUrl } = await req.json()

        const updatedPhone = phone.startsWith('0') ? phone.substring(1) : phone;

        const client = await clientPromise
        const db = client.db("notes_db")

        const IMG_API = "https://tamar-notebox96.vercel.app/api/notes/img";

        let finalImgUrl = imageUrl

        if (!imageUrl || imageUrl === "") {
            try {
                const res = await axios.get(IMG_API)
                finalImgUrl = res.data.data
            } catch (err) {
                console.error("Error fetching image from API:", err);
            }
        }

        const newNote = await db.collection('notes').insertOne({
            name,
            message: note,
            img: (mediaType === "choose" || mediaType === "image") ? finalImgUrl : null,
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