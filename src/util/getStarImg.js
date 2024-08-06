import star1 from "../assets/constellation/bull.png"
import star2 from "../assets/constellation/twins.png"
import star3 from "../assets/constellation/crab.png"
import star4 from "../assets/constellation/lion.png"
import star5 from "../assets/constellation/virgin.png"
import star6 from "../assets/constellation/balance.png"
import star7 from "../assets/constellation/scorpion.png"
import star8 from "../assets/constellation/archor.png"
import star9 from "../assets/constellation/goat.png"
import star10 from "../assets/constellation/vase.png"
import star11 from "../assets/constellation/fish.png"
import star12 from "../assets/constellation/sheep.png"



export function getStarImg(emotionId) {
    switch (emotionId) {
        case 1: return star1
        case 2: return star2
        case 3: return star3
        case 4: return star4
        case 5: return star5
        case 6: return star6
        case 7: return star7
        case 8: return star8
        case 9: return star9
        case 10: return star10
        case 11: return star11
        case 12: return star12
        default: return null
    }
}