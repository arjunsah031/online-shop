"use client";

import { useState } from "react";
import styles from './codinginterview.module.css'
import { object } from "zod";

export default function CodinInterview() {

    // const arry = ['arjun', 'arun',5,7,3, 'amit', 'mohan',5];

    // const data = arry.map( element => {

    //     return element.charAt(0,1).toUpperCase() + element.slice(1)

    // });

    // console.log(data)

    // const arry = ['arjun', 'arun',5,7,3, 'amit', 'mohan',5]
    //     let sum = 0;
    //     arry.map(item => {
            
    //       if (typeof item === 'number') {
    //          sum += item;
    //          return sum
    //       }

    //     });

    //     console.log(sum)

    // to find howmanyy string has repeated

    const  string = 'appleeefret';
    const array = string.split("")

    let obj = {}

    array.map( element => {

        // const thisus = obj[element] = (obj[element] || 0) + 1 

        if( obj.hasOwnProperty(element) === false) {
           return obj[element] = 1
        } else {
          return  obj[element]++
        }

    })

    console.log(obj)
    
    
         
      
    const [ text, setText ] = useState('')
    const [invertedText, setinvertedText ] = useState('')

    const handleInputChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit =(e) => {

        e.preventDefault();
        
        const stringtoarry = ( text.split(" "))
        const convertedstring = stringtoarry.map( element => {
        return element.split("").reverse().join("")
    })

    setinvertedText(convertedstring.reverse().join(" "))
    }
    

    return (
        <div className={styles.container}>
          <form className={styles.Form} onSubmit={handleSubmit}>
            <input
              type="text"
              value={text}
              onChange={handleInputChange}
              placeholder="Enter text"
              className={styles.input}
            />
            <button type="submit" className={styles.button}>Invert Text</button>
          </form>
          {invertedText && (
            <div className={styles.invertedTextContainer}>
              <h3 className={styles.h3}>Inverted Text:</h3>
              <p className={styles.p}>{invertedText}</p>
            </div>
          )}
        </div>
      );
    };

