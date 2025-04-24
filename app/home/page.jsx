"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Home.module.css";

import CharacterCard from "../../components/CharacterCard";
import Loader from "../../components/Loader";

export default function Home() {
    const [search, setSearch] = useState("")
    const [characters, setCharacters] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [page, setPage ] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetCharacters = async (name = "", pageNumber = 1) => {
        try {
            const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${name}`);
            setCharacters(data.results);
            setTotalPages(data.info.pages);
            setNotFound(false);
        } catch (error) {
            setCharacters([]);
            setNotFound(true);
        }
    };
    

    useEffect(() => {
        fetCharacters(search.trim(), page);
    }, [page]);

    useEffect(() => {
        fetCharacters(search, page);
    }, [search]);

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
                    handleLimparClick(`Você pesquisou por ${search}`, 1);
                    fetCharacters(search.trim())}}
                className={styles.buscar}
                >
                    Buscar
                </button>
                <button
                onClick={() => {
                    setSearch("");
                    fetCharacters("", 1);
                    handleLimparClick("Você limpou a busca");
                }}
                className={styles.limpar}
                >
                    Limpar
                </button>
            </div>

            <div className={styles.navControls}>
                <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className={styles.buttonNav}
                >
                    Página Anterior
                </button>
                <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className={styles.buttonNav}
                >
                    Próxima Página
                </button>
            </div>

            {notFound && (
            <h1 className={styles.notFound}>Nenhum personagem encontrado</h1>)}

            {loading ? (
                <div className={`${styles.loaderWrapper} ${loading ? "" : styles.hidden}`}>
                    <Loader />
                </div>
            ) : (
                <div className={styles.grid}>
                    {characters.map((char) => (
                        <CharacterCard key={char.id} character={char} onClick={() => handleCardClick(char)} />
                    ))}
                </div>
            )}

            <div className={styles.grid}>
            {characters.map((char) => (
                <CharacterCard key={char.id} character={char} onClick={() => handleCardClick(char.name)} />
            ))}
            </div>
            
        </div>
    );
}