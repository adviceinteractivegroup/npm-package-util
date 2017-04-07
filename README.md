# Advice-util library

This library is for using some common methods in all Advice's nodeJS
 projects

## Installation

## Methods

### normalize

This is the normalize method from GP's chibi-sephirot project
that is intended to normalize address, name, phones strings for
eventually being compared to another normalized string and determine
similarity.

### verifyNapGp

This is the verifyNap method from GP's chibi-sephirot project to compare
2 normalized strings and determine their similarity


### isNumeric

This method is intended to verify if a string is numeric or not.

#### Parameters
string

#### Returns
boolean

### isUrl
This method is intended to verify if a string is a url or not

#### Parameters
string

#### Returns
boolean


### getDirectories

This method is intended to extract the directory property from the
object elements of an array

#### Parameters
Array of objects

#### Returns
Array of strings (directory names)


### sorensen
Jose Duran's modification to sorensen-dice algorithm to verify
similarity between 2 strings

#### Parameters
arr1 String or Array
arr2 String or Array


#### returns
double (sorensen-dice similarity index)
