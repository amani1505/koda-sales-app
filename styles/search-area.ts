import { StyleSheet } from "react-native";
const SearchAreaStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  searchRow: {
    flexDirection: "row", // Change to row layout
    alignItems: "center", // Vertically center items
    paddingHorizontal: 20,
    paddingBottom: 10,
    gap: 5, // Space between elements
  },
  searchContainer: {
    flex: 1, // Take up remaining space
  },
  searchBar: {
    width: "100%",
  },
  inputIcon: {
    marginHorizontal: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,

    flex: 1,
  },

  refreshButton: {
    padding: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
  refreshFab: {
    width: 40,
    height: 40,
  },
  newButton: {
    // Ensure button has a minimum width
    minWidth: 100,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10, // Space between FAB and NEW button
  },
});

export default SearchAreaStyle;
