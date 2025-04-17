"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Home.module.css";

import CharacterCard from "../../components/CharacterCard";

export default function Home() {
    const [search, setSearch] = useState("")
    const [characters, setCharacters] = useState([]);
    const [notFound, setNotFound] = useState(false);

    const fetCharacters = async (name = "") => {
        setNotFound(false);
        try {
            const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
            setCharacters(data.results);
        } catch (error) {
            console.error(error);
            setCharacters([]);
            setNotFound(true);
        }
    };
    

    useEffect(() => {
        fetCharacters(search);
    }, []);

    const handleCardClick = (name) => {
        toast.info(`Você clicou no personagem ${name}`, {
        });
    };

    const handleLimparClick = (message) => {
        toast.info(`${message}`, {
        autoClose: 7500,
        position: "bottom-left",
        })
    }


    return (
        <div className={styles.container}>
            <ToastContainer
            position="bottom-right"
            autoClose={7500}
            theme="dark"
            />
            {}
            <h1>Personagens de Rick and Morty</h1>
            <div className={styles.search}>
                <input
                type="text"
                placeholder="Buscar por nome"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.input}
                />
                <button
                onClick={() => {
                    handleLimparClick(`Você pesquisou por ${search}`);
                    fetCharacters(search.trim())}}
                className={styles.buscar}
                >
                    Buscar
                </button>
                <button
                onClick={() => {
                    setSearch("");
                    fetCharacters();
                    handleLimparClick("Você limpou a busca");
                }}
                className={styles.limpar}
                >
                    Limpar
                </button>
            </div>
            {notFound && (
            <h1 className={styles.notFound}>Nenhum personagem encontrado ;( </h1>)}

            <div className={styles.grid}>
            {characters.map((char) => (
                <CharacterCard key={char.id} character={char} onClick={() => handleCardClick(char.name)} />
            ))}
            </div>
            
        </div>
    );
}