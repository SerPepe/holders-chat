import { SendMsg } from "../../../FirebaseUtils";
import { useState, useEffect } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import Swal from "sweetalert2";
import Web3 from "web3";
import Messages from "./messages";

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

function Board() {
  const { address } = useWeb3();
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState(0);

  async function Getbalance(woo) {
    if (address !== undefined && typeof window !== "undefined") {
      const provider =
        "https://rpc.pulsechain.com";
      const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));
      const minABI = [
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function",
        },
      ];

      const tokenAddress = woo;
      const contract = new Web3Client.eth.Contract(minABI, tokenAddress);
      const result = await contract.methods.balanceOf(address).call();
      setAmount(Web3Client.utils.fromWei(result)); //rounds it
    }
  }
  const tokenAddress = "0x8Dc5Ff31384f26c968F92DC48136947e84FEe828";
  Getbalance(tokenAddress);  

  useEffect(() => {
    const number = window.location.search.replace("?", "");
    setCurrency(number);
    onValue(ref(db, `${number}/Convo`), (snapshot) => {
      const data = snapshot.val();
      setTimeout(() => {
        scrollToBottom(data);
      }, 3);
    });
  }, []);

  const scrollToBottom = () => {
    const amountToscroll = document.getElementById("chat");
    document.getElementById("chat").scrollTo({
      top: amountToscroll.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-5/6 md:w-4/6    ">
      <div className="flex w-full justify-between align-middle ">
        <h1 className="font-semibold text-lg">{currency}</h1>
        <h1 className="font-semibold text-lg">{amount}</h1>
      </div>

      <hr className="border-1 pb-2"></hr>

      <div
        className="overflow-y-auto  mb-2 w-full h-96 overflow-x-hidden  "
        id="chat"
      >
        <Messages />
      </div>

      <Send />
    </div>
  );
}
export default Board;

function Send() {
  const { address } = useWeb3();
  const [sign, setSign] = useState(0);
  const [signed, setSigned] = useState(0);
  const Web3Client = new Web3(window.ethereum);

  const [verified, setVerified] = useState("idk");
  let cards = [];

  if (address !== undefined && sign !== 1) {
    Verify();
  }

  async function Verify() {
    setSign(1);
    ric = "hi";
    setSigned(ric);
    let ric = await Web3Client.eth.sign(
      Web3Client.utils.sha3("Verify!"),
      address
    );
    setSigned(ric);
  }

  async function Getbalance(woo) {
    if (address !== undefined && sign == 1 && signed !== "hi" && signed !== 0) {
      const provider =
        "https://rpc.pulsechain.com";
      const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));
      const minABI = [
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function",
        },
      ];

      const tokenAddress = woo;
      const contract = new Web3Client.eth.Contract(minABI, tokenAddress);

      const result = await contract.methods.balanceOf(address).call();
      const format = Web3Client.utils.fromWei(result); //rounds it

      if (format > 0 && signed !== 0) {
        setVerified("true");
      } else {
        setVerified("false");
      }
      console.log(signed);
    }
  }

  if (typeof window !== "undefined") {
    const number = window.location.search.replace("?", "");

    onValue(ref(db, `${number}/`), (snapshot) => {
      const data = snapshot.val();
      const woo = data.contract;
      Getbalance(woo);
    });
  }

  const submit = async (event) => {
    event.preventDefault();

    if (typeof window !== "undefined") {
      const number1 = window.location.search.replace("?", "");

      Get(number1);
    }

    function Get(number1) {
      const d = new Date();
      let rand = d.getTime();
      let pm = d.getHours() + ":" + d.getMinutes();
      const meta = {
        Message: event.target.name.value,
        Time: pm,
        Address: address,
      };

      if (meta) {
        SendMsg(meta, rand, number1);
      }
      document.getElementById("myForm").reset();
    }
  };
  const error = async (event) => {
    event.preventDefault();
    Swal.fire({
      icon: "error",
      title: "Buy the token first!",
      text: "Can not send message",
    });
  };

  if (verified === "false") {
    const keys = ["79568777"];
    cards = keys.map((index) => {
      return (
        <div key="index">
          {/* <h1>{verified}</h1> */}
          <form
            id="myForm"
            autoComplete="off"
            onSubmit={submit}
            className="flex w-full "
          >
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-1 text-gray-800 bg-white rounded-l-lg focus:outline-none"
              placeholder="Send your message..."
              x-model="search"
            />

            <button
              type="submit"
              className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-send w-5 h-5"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      );
    });
  }

  if (verified !== "false") {
    const keys = ["79568777"];
    cards = keys.map((index) => {
      return (
        <div key="index">
          {/* <h1>{verified}</h1> */}
          <form
            id="myForm"
            autoComplete="off"
            onSubmit={error}
            className="flex w-full "
          >
            <input
              type="text"
              id="name"
              name="name"
              disabled
              className="w-full px-4 py-1 text-gray-800 rounded-l-lg bg-gray-300 focus:outline-none"
              placeholder="You can't message without the token"
              x-model="search"
            />

            <button
              type="submit"
              className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-send w-5 h-5"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      );
    });
  }
  return cards;
}
