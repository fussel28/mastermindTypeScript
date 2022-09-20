import {Image, ImageBackground, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import androidNotch from "../android-notch";
import {Entypo} from '@expo/vector-icons';
import styles from "./style";
import React, {useState} from "react";
import styled from "styled-components/native";
import {savedColor1, savedColor2, savedColor3, savedColor4, indexCharacter} from "./Home";
import {choseCharacter} from "./Home";
import {useNavigation} from "@react-navigation/native";
import GameMenu from "./GameMenu";

function useForceUpdate(){
    const [value, setValue] = useState(0);
    return()=> setValue((value)=> value+1);
}

export default function GameScreen({route}) {

    // navigation to navigate to another screen
    const navigation = useNavigation();

    // vorgabe: shuffled array
    const {vorgabe} = route.params;

    // Styled Components
    // @see: https://docs.expo.dev/guides/using-styled-components/
    const Linenumber = styled.Text `
      color: white;
      font-family: "Oswald_200ExtraLight";
      margin-left: 12px;
      margin-top: 2px;
      font-size: 18px;
    `;

    const forceUpdate = useForceUpdate;
    const [visibleRow, setVisibleRow] = useState(1);

    let numbers = ["#fff", "#fff", "#fff", "#fff"];
    let spielfeldArray: string[][] =  [
        ["#fff", "#fff", "#fff", "#fff"],
        ["#fff", "#fff", "#fff", "#fff"],
        ["#fff", "#fff", "#fff", "#fff"],
        ["#fff", "#fff", "#fff", "#fff"],
        ["#fff", "#fff", "#fff", "#fff"],
        ["#fff", "#fff", "#fff", "#fff"],
        ["#fff", "#fff", "#fff", "#fff"],
        ["#fff", "#fff", "#fff", "#fff"]
    ];

    let pins: string[][] =  [
        ["#fff", "#fff", "#fff", "#fff"],
        ["#fff", "#fff", "#fff", "#fff"],
        ["#fff", "#fff", "#fff", "#fff"],
        ["#fff", "#fff", "#fff", "#fff"],
        ["#fff", "#fff", "#fff", "#fff"],
        ["#fff", "#fff", "#fff", "#fff"],
        ["#fff", "#fff", "#fff", "#fff"],
        ["#fff", "#fff", "#fff", "#fff"]
    ];

    let newStringArray:string[][];

    const [field2, setField2] = useState(spielfeldArray);
    const [pins2, setPins2] = useState(pins);

    const char = [1];
    let colors = [savedColor1, savedColor2, savedColor3, savedColor4];

    let currentColor = "#000" ;

    // React Hooks
    const [spielBeendet, setSpielBeendet] = React.useState(true);
    const [spielBeendetL, setSpielBeendetL] = React.useState(false);
    const [spielBeendetW, setSpielBeendetW] = React.useState(false);

    let auswerteCounter: number;

    // if color and button clicked set button to clicked color
    // @param color         color which should be set
    function changeColor(color: string){
        currentColor = color;
    }

    // make move
    // @param index, row
    function changeStyle(index:number, row:number) {
        spielfeldArray[row][index] = currentColor;

        newStringArray = spielfeldArray;
        newStringArray.slice();

        setField2(newStringArray);
    };

    // evaluate row, set Pins
    // @param row
    let evaluate = (row:number)  =>{
        let countBlack: number = 0;
        let array: string[][];
        auswerteCounter = 0;
        let markierArray: string[] = [];

        countBlack = checkBlackPins(vorgabe, spielfeldArray, row, countBlack, markierArray, pins);

        checkGrayPins(vorgabe, spielfeldArray, row, markierArray, pins);


        if (countBlack === 4) {
            checkWin(1);
        }

        if (row === 7) {
           checkWin(2)
        }

        // position of pins can't conclude color position
        pins[row].sort();

        array = pins;
        // copy Array into new array object
        array.slice();

        setPins2(array);
        // add a new game row
        setVisibleRow(visibleRow+ 1);
    }

    function checkWin(resultCode:number){

        if(resultCode === 1){
            setSpielBeendet(false);
            // print new Screen when win
            setSpielBeendetW(true);
            console.log("Du hast das Spiel gewonnen");
        }
        else if (resultCode === 2){
            setSpielBeendet(false);
            // print new Screen when loose
            setSpielBeendetL(true);
            console.log("Du hast das Spiel verloren");
        }
    }

    // print single element
    // @param value, index, row
    function printElement(value:string, index:number, row:number){
        numbers[index] = value;
        return (
            <TouchableOpacity key={index} style={{backgroundColor: field2[row][index], width: 55, height: 55, borderRadius: 10, borderColor: "#3A3A3A", borderStyle: "solid", borderWidth: 1, marginRight: 5, marginBottom: 5, marginTop: -10}}
                              onPress={() => changeStyle(index, row)}>
                <Text style={{fontSize: 10}}>{field2[row][index]}</Text>
            </TouchableOpacity>
        )

    }

    // prints line with single pins
    // @param i     index to increment numbers of lines
    function printPinsElement(value:string, index:number, row:number){
        pins[row][index]= value;
        return (
            <TouchableOpacity style={{width: 5, height: 5, backgroundColor: pins2[row][index], marginRight: 4}}>
                <Text></Text>
            </TouchableOpacity>
        )
    }

    // prints line with single elements using states
    // @param i     index to increment numbers of lines
    function printLine(value: string, index:number, row:number){

        spielfeldArray[row][index] = value;
        return (
            <View>
                {printElement(value, index, row) }
            </View>
        )
    }

    // print single pins
    // @param value, index, row
    function printPins(value:string, index:number, row:number){
        pins[row][index]= value;
        return (
            <View>
                {printPinsElement(value, index, row) }
            </View>
        )
    }

    // print line with touchable elements and pins
    // @param row
    function printField(row:number){
        if (visibleRow < row) return;

        return  (
            <View style={styles.colorpicker}>
                <TouchableOpacity style={styles.neon} onPress={() => evaluate(row) }>
                    <Linenumber>{row}</Linenumber>

                </TouchableOpacity>

                {field2[row].map((value: string, index) => printLine(value, index, row)) }

                <SafeAreaView style={{display: "flex", flexDirection: "row", marginLeft: 10, marginTop: 12}}>
                    {pins2[row].map((value: string, index) => printPins(value, index, row))}

                </SafeAreaView>
            </View>)
    }

    // change background color of button
    // @param i     string (color ("#fff"))
    function chooseColors(i: string){
        return (
            <TouchableOpacity style={[{backgroundColor: i}, styles.colorvalue]} onPress={() => changeColor(i)}>
                <Text></Text>
            </TouchableOpacity>
        )
    }

    // variable which prints field
    let field = (
        <View>
            <SafeAreaView style={{display: "flex", flexDirection: "column", position: "absolute"}}>
                <View>
                    <SafeAreaView style={styles.colorviewer}>
                        {colors.map((i) => chooseColors(i))}
                    </SafeAreaView>
                </View>
                {printField(1)}
                {printField(2)}
                {printField(3)}
                {printField(4)}
                {printField(5)}
                {printField(6)}
                {printField(7)}
            </SafeAreaView>

            <SafeAreaView style={{bottom: -535}}>
                <Text style={styles.textbubble}>
                    {char.map((i: number) => TextCharacter())}
                </Text>

                <Text>
                    {char.map((i: number) => choseCharacter(indexCharacter))}
                </Text>
            </SafeAreaView>
        </View>
    );

    // Winner Screen
    let resultW =  (
        <View>
            <SafeAreaView style={{marginTop: 30}}>
                <Text style={styles.WinnerText}>
                    Congratulations.
                </Text>
                <Text style={styles.WinnerTextSmall}>
                    You won this battle.
                </Text>
            </SafeAreaView>
            <SafeAreaView style={{bottom: -415}}>
                <Text style={styles.textbubble}>
                    Congratulations from me too, I hope you enjoyed the game.{"\n"} Now you can go to the main menu via the menu and just play again.
                </Text>

                <Text>
                    {char.map((i: number) => choseCharacter(indexCharacter))}
                </Text>
            </SafeAreaView>
        </View>
    )

    // Lose Screen
    let resultL =  (
        <View>
            <SafeAreaView style={{marginTop: 30}}>
                <Text style={styles.WinnerText}>
                    Don't be sad.
                </Text>
                <Text style={styles.WinnerTextSmall}>
                    But you lose this battle.
                </Text>
            </SafeAreaView>
            <SafeAreaView style={{bottom: -415}}>
                <Text style={styles.textbubble}>
                    Nevertheless, I hope you enjoyed the game.{"\n"} Now you can go to the main menu via the menu and just play again.
                </Text>

                <Text>
                    {char.map((i: number) => choseCharacter(indexCharacter))}
                </Text>
            </SafeAreaView>
        </View>
    )

    // returns a different text for each index
    function TextCharacter() {
        if (indexCharacter == 1){
            return (
                <Text style={styles.textbubble}>
                    Welcome, I'm Elcho and I'm going to share some tips & tricks with you. {"\n"}Click on a color to
                    fill the next uncolored square in that color.
                </Text>
            )
        } else if (indexCharacter == 2) {
            return (
                <Text style={styles.textbubble}>
                    Welcome, I'm Pengu and I'm going to share some tips & tricks with you. {"\n"}Click on a color to
                    fill the next uncolored square in that color.
                </Text>
            )
        } else if (indexCharacter == 2) {
            return (
                <Text style={styles.textbubble}>
                    Welcome, I'm Doggo and I'm going to share some tips & tricks with you. {"\n"}Click on a color to
                    fill the next uncolored square in that color.
                </Text>
            )
        }
    }

    return (
        <SafeAreaView style={androidNotch.AndroidSafeArea}>
            <ImageBackground source={require("../assets/GameFrame.png")} style={{height: 800}}>

                <TouchableOpacity onPress={() => navigation.navigate("GameMenu")}>
                    <Entypo name={"menu"} size={30} color={"white"} style={{marginLeft: 20}}></Entypo>
                </TouchableOpacity>

                <View style={styles.GameScreen}>

                    {spielBeendet && field}
                    {spielBeendetW && resultW}
                    {spielBeendetL && resultL}


                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

// function which returns black pins for correct color at right position
// @param vorgabe, spielfeldArray, row, countBlack, markierArray, pins
export function checkBlackPins(vorgabe: string[], spielfeldArray: string[][], row: number, countBlack: number, markierArray: string[], pins: string[][]) {
    for (let i = 0; i < vorgabe.length; i++) {
        if (spielfeldArray[row][i] === vorgabe[i]) {
            countBlack++;
            if (!markierArray.includes(vorgabe[i])) {
                markierArray.push(vorgabe[i]);
                pins[row][i] = "#111";
            }
        }
    }
    return countBlack;
}

// function which returns gray pins for correct color at array
// @param vorgabe, spielfeldArray, row, markierArray, pins
export function checkGrayPins(vorgabe: string[], spielfeldArray: string[][], row: number, markierArray: string[], pins: string[][]) {
    let countGray: number = 0;
    for (let i = 0; i < vorgabe.length; i++) {
        for (let j = 0; j < vorgabe.length; j++) {
            if (spielfeldArray[row][i] === vorgabe[j]) {
                countGray++;
                if (!markierArray.includes(vorgabe[j])) {
                    markierArray.push(vorgabe[j]);
                    pins[row][i] = "#999";
                }
            }
        }
    }
    return countGray;
}