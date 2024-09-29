export interface ITabBarIconProps {
  color: string;
  size: number;
  name: string;
  focused: boolean
}

export type TDate= {
  start: string;
  end: string;
}

export  type TabBarLabelProps = {
  focused: boolean;
  color: string;
  children: string;
};
