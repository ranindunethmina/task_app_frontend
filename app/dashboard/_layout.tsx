import {Drawer} from "expo-router/drawer";

export default function Dashboard() {
    return (
            <Drawer>
                <Drawer.Screen name="home" options={{title : "Home"}}/>
                <Drawer.Screen name="task" options={{title : "Tasks"}}/>
            </Drawer>
    );
}