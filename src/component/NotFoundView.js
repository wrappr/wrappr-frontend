import React from "react";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";

export default function NotFoundView() {
    return (
        <Grid container spacing={12}>
            <Typography variant={"h2"}>404 - Page not found!</Typography>
        </Grid>
    );
}