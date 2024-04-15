import Head from "next/head";
import { useState, useEffect } from "react";
import Web3 from 'web3'
import erc721ContractFunc from "@/blockchain/erc721";
import 'bulma/css/bulma.css'
import styles from "../styles/ERC721.module.css"

export default function Home() {
    const [error, setError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [balance, setBalance] = useState('')
    const [minted, setMinted] = useState('')
    const [mintAddress, setMintAddress] = useState('')
    const [address, setAddress] = useState(null)
    const [web3, setWeb3] = useState(null)
    const [erc721Contract, setErc721Contract] = useState(null)

    useEffect(() => {
        if(erc721Contract && address) getMintedHandler()
        if(erc721Contract && address) getInventoryHandler()
    }, [erc721Contract, address])

    const getInventoryHandler = async () => {
        // const accounts = await web3.eth.getAccounts()
        const balance = await erc721Contract.methods.balanceOf(address).call()
        console.log(balance)
        setBalance(balance)
    }

    const getMintedHandler = async () => {
        // const accounts = await web3.eth.getAccounts()
        const minted = await erc721Contract.methods.mintCount(address).call()
        console.log(minted)
        setMinted(minted)
    }

    const updateMintAddress = event => {
        setMintAddress(event.target.value)
    }

    const mintNFT = async () => {
        try{
            if(mintAddress !== ''){
                await erc721Contract.methods.mintToken(mintAddress).send(
                    {
                        from: address,
                        value: web3.utils.toWei('0.1', 'ether')
                    }
                )
            } else{
                await erc721Contract.methods.mintToken().send(
                    {
                        from: address,
                        value: web3.utils.toWei('0.1', 'ether')
                    }
                )
            }

            setSuccessMsg("NFT Minted Successfully")
            setError("")
            if(erc721Contract && address) getMintedHandler()
            if(erc721Contract && address) getInventoryHandler()
        }
        catch(err){
            setError(err.message)
            setSuccessMsg("")
        }
    }

    const connectWalletHandler = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
            try{
                await window.ethereum.request({
                    method: "eth_requestAccounts"
                })
                const web3 = new Web3(window.ethereum)
                setWeb3(web3)
                const accounts = await web3.eth.getAccounts()

                setAddress(accounts[0])

                const erc = erc721ContractFunc(web3)
                setErc721Contract(erc)

                
            } catch (err){
                setError(err.message)
            }
        }
        else{
            // Metamask not installed
            console.log("Please install metamask")
            alert("Please install metamask")
        }
        // alert("connect wallet")
    }

    return(
        <div className={styles.main}>
            <Head>
                <title>ERC721 App</title>
                <meta name="description" content="ERC721 minting app" />
            </Head>

            <nav className="navbar mt-4 mb-4">
                <div className="container">
                    <div className="navbar-brand">
                        <h1>ERC721 Minter</h1>
                    </div>
                    <div className="navbar-end">
                        <button onClick={connectWalletHandler} className='button is-primary'>Connect Wallet</button>
                    </div>
                </div>
            </nav>
            <section>
                <div className="container">
                    <h2>NFT Balance: {balance.toString()}</h2>
                </div>
            </section>
            <section>
                <div className="container">
                    <h2>Minted NFTs: {minted.toString()}</h2>
                </div>
            </section>
            <section className="mt-5">
                <div className="container">
                    <div className='field'>
                        <label className="label">Mint NFT</label>
                        <div className="control">
                            <input onChange={updateMintAddress} className="input" type="type" placeholder="Enter Address (Default: self)" />
                        </div>
                        <button onClick={mintNFT} className='button is-primary mt-2'>Mint</button>
                    </div>
                </div>
            </section>
            <section>
                <div className="container has-test-danger">
                    <p>{error}</p>
                </div>
            </section>
            <section>
                <div className="container has-test-success">
                    <p>{successMsg}</p>
                </div>
            </section>
        </div>
    )
}
