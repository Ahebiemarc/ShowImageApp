import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DATAPROS } from "../data";



// définition des paramètres de route possibles pour la pile racine de  l'application
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  //ImageDetails: {item: DATAPROS}
  
  
};

/**
 * Cette déclaration de type est utilisée pour définir les props d'écran pour les écrans de la pile racine de votre application.
 * Cette déclaration de type prend un paramètre générique T qui est contraint à être une clé de RootStackParamList.
 * Elle utilise NativeStackScreenProps de React Navigation pour définir les props d'écran pour une pile de navigation.
 * L'argument de type RootStackParamList spécifie les types de paramètres de route possibles dans la pile racine.
 * En fonction de la valeur de T, cette déclaration de type retournera les props d'écran correspondants pour cet écran.
 */

export type RootStackScreenProps<T extends keyof RootStackParamList> = 
    NativeStackScreenProps<RootStackParamList, T>;






/*
 Cette déclaration étend le namespace ReactNavigation pour inclure une interface RootParamList qui est équivalente à RootStackParamList. 
 Cela permet d'accéder aux types de paramètres de la pile racine de navigation dans tout le projet sans avoir à les importer explicitement.
*/

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {
        }
    }
}
  