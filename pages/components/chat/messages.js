import { useState, useEffect } from "react"
import { getDatabase, ref, onValue, get} from "firebase/database";
import { initializeApp } from 'firebase/app';
import Message from "./message";

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

const db = getDatabase(app);

function Messages(){
    let list = []
    const [convo, setConvo] = useState(null);
    const [user, setUser] = useState(null);    

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const number = window.location.search.replace('?', '');
            
            Get(number)
        }
    }, []);

    function Get(number){
            onValue( ref(db, `${number}/`), (snapshot) => {
                const data = snapshot.val();
                setConvo(data.Convo);
                setUser(data.Users);   
           
            });
    }




    if(convo!==null && user!==null ){
        let Keys = Object.keys(convo)
        list = Keys.map(index => {
        const messageData = convo[index]
        return (
          <span key={index}>
             <Message  
             message={messageData.Message} 
             time={messageData.Time} 
             name={messageData.Address}
             />
          </span>
        )
        })
        } 
    else { return (
            <div>
                  <div className="flex pb-4">

        
<div className="w-14 pr-8">
    <div className=" bg-gray-400 text-blue-600  rounded-full h-14 pr-8 w-14 animate-pulse" />
</div>

<div className="flex gap-4 pl-4 pt-2	">
    <div className=" bg-gray-400 text-blue-600 w-20 rounded-md h-6 animate-pulse"></div>
    <div className=" bg-gray-400  w-28 rounded-md h-6 animate-pulse" />
</div>


</div>
                
            </div>
        )}
    return list
}
export default Messages
