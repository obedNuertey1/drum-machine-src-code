import Heater_1 from "./audio/Heater-1.mp3";
import Heater_2 from "./audio/Heater-2.mp3";
import Heater_3 from "./audio/Heater-3.mp3";
import Heater_4 from "./audio/Heater-4_1.mp3";
import Clap from "./audio/Heater-6.mp3";
import Open_hh from "./audio/Dsc_Oh.mp3";
import KicknHat from "./audio/Kick_n_Hat.mp3";
import Kick from "./audio/RP4_KICK_1.mp3";
import Closed_hh from "./audio/Cev_H2.mp3";
import silence from "./audio/silence.mp3";

//##############################################Import 2##################################################################
import coolRide from "./audio2/Cool_Ride.mp3";
import cop_a_feel from "./audio2/Cop_A_Feel.mp3";
import getUp_standUp from "./audio2/Get_Up_Stand_Up.mp3";
import I_still_want_you from "./audio2/I_still_wan't_you.mp3";
import last_horizon from "./audio2/last_horizon.mp3";
import smooth_jazz_night from "./audio2/smooth_jazz_night.mp3";
import so_much_trouble from "./audio2/So_Much_Trouble.mp3";
import still_not_rite from "./audio2/still_not_rite.mp3";
import the_Gentlemen from "./audio2/The_Gentlemen.mp3";
import rearview from "./audio2/rearview.mp3";

export const audioObject = [
	{
		Q:{
			link: silence,
			name: "a",
			keycode: 81
		},
		W:{
			link: silence,
			name: "b",
			keycode: 87
		},
		E:{
			link: silence,
			name: "." ,
			keycode: 69
		},
		A:{
			link: silence,
			name: ".",
			keycode: 65
		},
		S:{
			link: silence,
			name: "." ,
			keycode: 83
		},
		D:{
			link: silence,
			name: ".",
			keycode: 68
		},
		Z:{
			link: silence,
			name: ".",
			keycode: 90
		},
		X:{
			link: silence,
			name: "." ,
			keycode: 88
		},
		C:{
			link: silence,
			name: ".",
			keycode: 67
		}
	},
	{
		Q:{
			link: Heater_1,
			name: "Heater 1",
			keycode: 81
		},
		W:{
			link: Heater_2,
			name: "Heater 2",
			keycode: 87
		},
		E:{
			link: Heater_3,
			name: "Heater 3",
			keycode: 69
		},
		A:{
			link: Heater_4,
			name: "Heater 4",
			keycode: 65
		},
		S:{
			link: Clap,
			name: "Clap",
			keycode: 83 
		},
		D:{
			link: Open_hh,
			name: "Open HH",
			keycode: 68
		},
		Z:{
			link: KicknHat,
			name: "Kick n' Hat",
			keycode: 90
		},
		X:{
			link: Kick,
			name: "Kick",
			keycode: 88
		},
		C:{
			link: Closed_hh,
			name: "Closed HH",
			keycode: 67
		}
	},
	{
		Q:{
			link: coolRide,
			name: "Cool Ride",
			keycode: 81
		},
		W:{
			link: cop_a_feel,
			name: "Cop A Feel",
			keycode: 87
		},
		E:{
			link: getUp_standUp,
			name: "Get Up, Stand Up",
			keycode: 69 
		},
		A:{
			link: I_still_want_you,
			name: "I still want to",
			keycode: 65
		},
		S:{
			link: rearview,
			name: "Rear View",
			keycode: 83 
		},
		D:{
			link: smooth_jazz_night,
			name: "Smooth Jazz Night",
			keycode: 68
		},
		Z:{
			link: so_much_trouble,
			name: "So Much Trouble",
			keycode: 90
		},
		X:{
			link: still_not_rite,
			name: "Still Not Rite",
			keycode: 88 
		},
		C:{
			link: the_Gentlemen,
			name: "The Gentlemen",
			keycode: 67
		}
	}
];
