import "../styles/globals.css";
import Image from 'next/image';

import flask from "../images/logos/flask.svg";
import react from "../images/logos/react.svg";
import javascript from "../images/logos/javascript.svg";
import python from "../images/logos/python.svg";
import selenium from "../images/logos/selenium.svg";
import tensorflow from "../images/logos/tensorflow.svg";
import pandas from "../images/logos/pandas.svg";
import numpy from "../images/logos/numpy.svg";
import matplotlib from "../images/logos/matplotlib.svg";
import cpp   from "../images/logos/c-plusplus.svg";
import rust from "../images/logos/rust.svg";

type LogoName = "flask" | "react" | "javascript" | "python" | "selenium" | "tensorflow" | "pandas" | "numpy" | "matplotlib" | "cpp" | "rust";

const logos: { [key in LogoName]: string } = {
    flask,
    react,
    javascript,
    python,
    selenium,
    tensorflow,
    pandas,
    numpy,
    matplotlib,
    cpp,
    rust,
};

export default function IconHandler({ name }: { name: string }) {
    const logoName = name.toLowerCase() as LogoName
    const logoSrc = logos[logoName];

    if (!logoSrc) {
        console.error(`Logo not found for: ${name}`);
        return null;
    }

    return (
        <Image src={logoSrc} alt={name} className="w-16 h-16 sm:w-14 sm:h-14 md:w-24 md:h-24 bg-gradient-to-tr from-violet-500/20 to-purple-800/50 p-5 rounded-md" />
    );
}
