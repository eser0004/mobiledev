import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const PREVIEW_LEN = 25;

function makePreview(text) {
  const trimmed = text.trim();
  if (trimmed.length <= PREVIEW_LEN) return trimmed;
  return trimmed.slice(0, PREVIEW_LEN) + "...";
}

export default function App() {
  // Liste af noter: { id, text }
  const [notes, setNotes] = useState([]);
  // Input-feltet på "liste-siden"
  const [newNoteText, setNewNoteText] = useState("");

  // "Navigation": hvis selectedId != null, viser vi detail-side
  const [selectedId, setSelectedId] = useState(null);
  // Tekst der redigeres på detail-siden
  const [draftText, setDraftText] = useState("");

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  function addNote() {
    const text = newNoteText.trim();
    if (!text) return;

    const note = {
      id: String(Date.now()),
      text,
    };

    setNotes((prev) => [...prev, note]); // ny note til sidst
    setNewNoteText(""); // ryd input efter tilføj (krav)
  }

  function openDetail(note) {
    setSelectedId(note.id);
    setDraftText(note.text); // start redigering med eksisterende tekst
  }

  function goBack() {
    setSelectedId(null);
    setDraftText("");
  }

  function saveDetail() {
    const text = draftText.trim();
    if (!text) {
      Alert.alert("Tom note", "En note må ikke være tom.");
      return;
    }

    setNotes((prev) =>
      prev.map((n) => (n.id === selectedId ? { ...n, text } : n))
    );
    goBack();
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (selectedId === id) goBack();
  }

  function confirmDelete(id) {
    Alert.alert("Slet note?", "Er du sikker?", [
      { text: "Annullér", style: "cancel" },
      { text: "Slet", style: "destructive", onPress: () => deleteNote(id) },
    ]);
  }

  // -------------------------
  // DETAIL-SIDE
  // -------------------------
  if (selectedNote) {
    return (
      <View style={styles.screen}>
        <View style={styles.card}>
          <Text style={styles.h1}>Note (detail)</Text>

          <Text style={styles.label}>Redigér tekst:</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline]}
            value={draftText}
            onChangeText={setDraftText}
            placeholder="Skriv din note..."
            multiline
          />

          <View style={styles.row}>
            <Pressable style={[styles.btn, styles.btnGhost]} onPress={goBack}>
              <Text style={styles.btnTextGhost}>Tilbage</Text>
            </Pressable>

            <Pressable style={[styles.btn, styles.btnDanger]} onPress={() => confirmDelete(selectedNote.id)}>
              <Text style={styles.btnText}>Slet</Text>
            </Pressable>

            <Pressable style={[styles.btn, styles.btnPrimary]} onPress={saveDetail}>
              <Text style={styles.btnText}>GEM</Text>
            </Pressable>
          </View>
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }

  // -------------------------
  // LISTE-SIDE
  // -------------------------
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.h1}>Notes</Text>

        <Text style={styles.label}>Ny note:</Text>
        <TextInput
          style={styles.input}
          value={newNoteText}
          onChangeText={setNewNoteText}
          placeholder="Skriv en note..."
        />

        <Pressable style={[styles.btn, styles.btnPrimary]} onPress={addNote}>
          <Text style={styles.btnText}>Tilføj note</Text>
        </Pressable>

        <View style={styles.divider} />

        <Text style={styles.label}>Liste:</Text>
        {notes.length === 0 ? (
          <Text style={styles.empty}>Ingen noter endnu.</Text>
        ) : (
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.noteRow}>
                <Pressable
                  style={styles.noteBox}
                  onPress={() => openDetail(item)}
                >
                  <Text style={styles.noteText}>{makePreview(item.text)}</Text>
                </Pressable>

                <Pressable
                  style={[styles.smallBtn, styles.btnDanger]}
                  onPress={() => confirmDelete(item.id)}
                >
                  <Text style={styles.smallBtnText}>Slet</Text>
                </Pressable>
              </View>
            )}
          />
        )}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    justifyContent: "center",
    padding: 18,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    elevation: 6,
  },
  h1: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#666",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  inputMultiline: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  btnPrimary: {
    backgroundColor: "#111",
  },
  btnDanger: {
    backgroundColor: "#c62828",
  },
  btnGhost: {
    backgroundColor: "#eee",
  },
  btnText: {
    color: "white",
    fontWeight: "700",
  },
  btnTextGhost: {
    color: "#111",
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 14,
  },
  empty: {
    color: "#777",
    marginTop: 4,
  },
  noteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  noteBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#fafafa",
  },
  noteText: {
    fontSize: 16,
  },
  smallBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  smallBtnText: {
    color: "white",
    fontWeight: "800",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    marginTop: 10,
  },
});
