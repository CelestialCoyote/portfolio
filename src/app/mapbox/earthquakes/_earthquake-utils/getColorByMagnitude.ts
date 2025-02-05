export const getColorByMagnitude = (mag: number) => {
    const colors = [
        { mag: 2.0, color: "green" },
        { mag: 3.0, color: "#88C057" },
        { mag: 4.0, color: "yellow" },
        { mag: 5.0, color: "#FFC100" },
        { mag: 6.0, color: "orange" },
        { mag: 7.0, color: "#FF4500" },
        { mag: 8.0, color: "red" },
        { mag: 9.0, color: "#B22222" },
    ];

    for (let i = colors.length - 1; i >= 0; i--) {
        if (mag >= colors[i].mag) {
            return colors[i].color;
        }
    }
    return "green";
}
