import React, { Component } from 'react';

type IUser = {
    name: string;
    age: number;
};

type IProps = {
    user: IUser;
};

// =======================
// Functional Components
// =======================

// 1. FirstComponent: simple primitive props
export const FirstComponent = React.memo(({ name, age }: IUser) => {
    console.log('Rendering FirstComponent'); // optional: for debug
    return (
        <div>
            my name is {name}, my age is {age}
        </div>
    );
});

// 2. SecondComponent: receives an object prop
export const SecondComponent = React.memo(
    ({ user: { name, age } }: IProps) => {
        console.log('Rendering SecondComponent'); // optional: for debug
        return (
            <div>
                my name is {name}, my age is {age}
            </div>
        );
    },
    (prevProps, nextProps) =>
        prevProps.user.name === nextProps.user.name &&
        prevProps.user.age === nextProps.user.age
);

// =======================
// Class Components
// =======================

// 3. ThirdComponent: props are primitives
export class ThirdComponent extends React.PureComponent<IUser> {
    render() {
        console.log('Rendering ThirdComponent'); // optional: for debug
        const { name, age } = this.props;
        return (
            <div>
                my name is {name}, my age is {age}
            </div>
        );
    }
}

// 4. FourthComponent: props is an object
export class FourthComponent extends Component<IProps> {
    shouldComponentUpdate(nextProps: IProps) {
        const { user } = this.props;
        const { user: nextUser } = nextProps;

        return user.name !== nextUser.name || user.age !== nextUser.age;
    }

    render() {
        console.log('Rendering FourthComponent'); // optional: for debug
        const { user } = this.props;
        return (
            <div>
                my name is {user.name}, my age is {user.age}
            </div>
        );
    }
}
