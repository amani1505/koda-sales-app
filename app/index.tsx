// // import { useEffect, useState } from "react";
// // import { ActivityIndicator } from "react-native";
// // import { router } from "expo-router";
// // import { ThemedView } from "@/components/ThemedView";
// // import { useAuth } from "@/hooks/useAuth";

// // export default function Index() {
// //   const { isAuthenticated } = useAuth();
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     // Ensure navigation happens after the component has mounted
// //     if (isAuthenticated) {
// //       router.replace("/(tabs)");
// //     } else {
// //       router.replace("/(auth)");
// //     }
// //     setLoading(false);
// //   }, [isAuthenticated]);

// //   if (loading) {
// //     return (
// //       <ThemedView className="items-center justify-center flex-1 bg-white">
// //         <ActivityIndicator size="large" color="#0000ff" />
// //       </ThemedView>
// //     );
// //   }

// //   return null;
// // }

// import { useEffect, useState } from "react";
// import { ActivityIndicator } from "react-native";
// import { router } from "expo-router";
// import { ThemedView } from "@/components/ThemedView";
// import { useAuth } from "@/hooks/useAuth";
// import { useSplash } from "@/hooks/useSplash";

// export default function Index() {
//   const { isAuthenticated } = useAuth();
//   const { showSplash } = useSplash();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!showSplash) {
//       if (isAuthenticated) {
//         router.replace("/(tabs)");
//       } else {
//         router.replace("/(auth)");
//       }
//       setLoading(false);
//     }
//   }, [isAuthenticated, showSplash]);

//   if (loading) {
//     return (
//       <ThemedView className="items-center justify-center flex-1 bg-white">
//         <ActivityIndicator size="large" color="#0000ff" />
//       </ThemedView>
//     );
//   }

//   return null;
// }


import { Redirect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const { isAuthenticated } = useAuth();

  return <Redirect href={isAuthenticated ? "/(tabs)" : "/(auth)"} />;
}