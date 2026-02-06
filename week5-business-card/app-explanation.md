# React Native – Business Card App (Week 5)

## Formål
Appen viser et simpelt business card med:
- Logo
- Firmanavn og beskrivelse
- Kontaktoplysninger
- Adresse

## Vigtige komponenter
- View: container / layout
- Text: tekst
- Image: billede
- StyleSheet: styling
- StatusBar: telefonens statusbar

## Struktur
- screen: fylder hele skærmen
- card: hvid boks med afrundede hjørner
- logo: billede fra assets-mappen
- divider: vandret streg
- tekstsektioner: Contact og Address

## Image
Lokale billeder skal:
- ligge i assets/
- importeres med require()
- have fast højde/bredde

Eksempel:
Image source={require("./assets/image.png")}

## Styling
Styling laves med StyleSheet.create
- flex bruges til layout
- elevation giver skygge (Android)
- textAlign centerer tekst

## Resultat
En simpel, pæn React Native app der opfylder Week 5-kravene.
