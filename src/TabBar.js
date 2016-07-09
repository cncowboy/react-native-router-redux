import React, { Component } from 'react';
import Tabs from 'react-native-tabs';
import { Image, StyleSheet, Text, View } from 'react-native';

const onSelect = props => el => {
  props.actions.changeTab({
    from: props.activeTab,
    name: el.props.name,
    navigator: props.navigator,
  });

  return {
    selectionColor: props.tabStyles.tint || '#037AFF',
  };
};

const imageStyle = props => {
  let obj = {
    height: 25,
    resizeMode: 'contain',
    width: 30,
  }
  if (!props.tabStyles.ignoreIconTint)
  {
    obj.tintColor = props.selectionColor || '#929292';
  }
  return obj;
};

const tabBarStyle = props => {
  let obj = {
    backgroundColor: props.tabStyles.barTint || '#F9F9F9',
    borderTopColor: props.tabStyles.borderTopColor || '#D8D8D8',
    borderTopWidth: props.tabStyles.borderTopWidth || 1,
  };
  if (props.tabStyles.borderTopWidth===0) obj.borderTopWidth = 0;
  return obj;
};

const tabContainerStyle = () => ({
  alignItems: 'center',
  justifyContent: 'center',
});

const textStyle = props => {
  let obj = {
    color: props.tabStyles.normalTint || '#929292',
    fontSize: 10,
    letterSpacing: 0.2,
    marginBottom: 2,
    marginTop: 4,
  };
  if (props.name===props.activeTab)
  {
    obj.color = props.tabStyles.tint || '#929292';
  }
  return obj;
};

class TabBarIcon extends Component {
  render() {
    const { name, tabItem, activeTab } = this.props;
    let icon = tabItem.icon;
    if (name === activeTab){
      icon = tabItem.selIcon;
    }

    const txtStyle = textStyle(this.props);
    return (
      <View name={name} style={tabContainerStyle()}>
        {icon &&
          <Image
            source={icon}
            style={imageStyle(this.props)}
            />
        }
        {tabItem.title &&
          <Text style={txtStyle}>{tabItem.title}</Text>
        }
      </View>
    );
  }
}

export default class TabBar extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    const { tabs, activeTab } = this.props;

    const tabBarItems = Object.keys(tabs).map(tabName => {
      const tab = tabs[tabName];
      const tabItem = tab.tabItem || {};

      return (
        <TabBarIcon
          key={tabName}
          name={tabName}
          tabItem={tabItem}
          activeTab={activeTab}
          tabStyles={this.props.tabStyles}
          />
      );
    });

    return (
      <Tabs
        activeOpacity={1.0}
        onSelect={onSelect(this.props)}
        selected={this.props.activeTab}
        style={tabBarStyle(this.props)}
        >
        {tabBarItems}
      </Tabs>
    );
  }
}
