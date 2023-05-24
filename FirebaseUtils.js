import { initializeApp } from 'firebase/app';
import { get, set, ref, getDatabase} from 'firebase/database';

// yes this is intentional ;)
const firebaseConfig = {
    apiKey: "AIzaSyDxXV07P9a9xDMHPM1Uio1b2YzLQUCexXE",
    authDomain: "the-fallen-one-chat.firebaseapp.com",
    databaseURL: "https://the-fallen-one-chat-default-rtdb.firebaseio.com",
    projectId: "the-fallen-one-chat",
    storageBucket: "the-fallen-one-chat.appspot.com",
    messagingSenderId: "669186742455",
    appId: "1:669186742455:web:c175c9a70f059789011532",
    measurementId: "G-1B7M6NEQ7E"
  };

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export async function GetMessages() {
    const val = await get(ref(database, "/Convo"))
                    .catch(err => console.log(err))
    const padawans = await val.val()
    return padawans
}

export async function SendMsg(meta, rand, location) {
    
    const dbref = ref(database, `/${location}/Convo/${rand}`)
    const result = await set(dbref, meta)
}