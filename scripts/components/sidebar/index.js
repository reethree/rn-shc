import React, { Component } from "react";
import { Image } from "react-native";

import {
  Header,
	Content,
	Text,
	List,
	ListItem,
	Icon,
	Container,
	Left,
	Right,
	Badge,
	Button,
	View,
	StyleProvider,
	getTheme,
	variables,
} from "native-base";

import styles from "./style";

const datas = [
	{
		name: "Dashboard",
		route: "Main",
		icon: "ios-home",
		bg: "#C5F442",
	},
	{
		name: "Chat",
		route: "Chat",
		icon: "ios-chatbubbles",
		bg: "#C5F442",
	},
  {
		name: "Create Ads",
		route: "StepOne",
		icon: "ios-add",
		bg: "#C5F442",
	}
];

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4,
		};
	}

  _onNav(route) {

  }

	render() {
		return (
			<Container>
        <Header
        androidStatusBarColor="#000000"
        iosBarStyle="light-content"
        />
				<Content>
					<List
						dataArray={datas} renderRow={data =>
							<ListItem button border
              onPress={() => this.props.navigation.navigate(data.route)}>
								<Left>
									<Icon active name={data.icon} style={{ color: "#777", fontSize: 26, width: 30 }} />
									<Text style={styles.text}>
										{data.name}
									</Text>
								</Left>
								{data.types &&
									<Right style={{ flex: 1 }}>
										<Badge
											style={{
												borderRadius: 3,
												height: 25,
												width: 72,
												backgroundColor: data.bg,
											}}
										>
											<Text style={styles.badgeText}>{`${data.types} Types`}</Text>
										</Badge>
									</Right>}
							</ListItem>}
					/>
				</Content>
			</Container>
		);
	}
}

export default SideBar;
