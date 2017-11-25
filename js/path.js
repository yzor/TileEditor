var path = {}

var s1 = "M10,18a8,8,0,1,1,8-8A8,8,0,0,1,10,18Zm6-8a5.957,5.957,0,0,0-1.118-3.468L11.414,10l3.468,3.468A5.957,5.957,0,0,0,16,10Zm-2.532,4.882L10,11.414,6.532,14.882A5.937,5.937,0,0,0,13.468,14.882ZM4,10a5.956,5.956,0,0,0,1.118,3.468L8.586,10,5.118,6.532A5.956,5.956,0,0,0,4,10ZM6.532,5.118L10,8.586l3.468-3.468A5.937,5.937,0,0,0,6.532,5.118Z";
var s2 = "M10,18a8,8,0,1,1,8-8A8,8,0,0,1,10,18Zm6-8a5.957,5.957,0,0,0-1.118-3.468l-8.35,8.35A5.985,5.985,0,0,0,16,10ZM4,10a5.956,5.956,0,0,0,1.118,3.468l8.35-8.35A5.985,5.985,0,0,0,4,10Z";
var s3 = "M2,16H18L10,2Z";
var s4 = "M2,16L10,2l8,14H2ZM9.99,6.04L5.43,14.02h9.12Z";
var s5 = "M2,16L10,2l8,14H2Zm12.55-1.98L13.4,12H6.584L5.43,14.02h9.12ZM9.99,6.04L7.727,10h4.526Z";
var s6 = "M18,10L10,2,2,10H6.242L10,6.241,13.759,10H18ZM10,4.827L14.173,9h1.414L10,3.413,4.413,9H5.827Z";
var s7 = "M17.24,18H14V10a4,4,0,0,0-8,0v8H2V10a8,8,0,0,1,16,0v8H17.24ZM10,3.34A6.66,6.66,0,0,0,3.34,10v6.66H4.66V10a5.34,5.34,0,0,1,10.68,0v6.66h1.32V10A6.66,6.66,0,0,0,10,3.34Z";
var s11 = "M10,18a8,8,0,1,1,8-8A8,8,0,0,1,10,18ZM10,4a6,6,0,1,0,6,6A6,6,0,0,0,10,4Zm0,9a3,3,0,1,1,3-3A3,3,0,0,1,10,13Z";
var s13 = "M18,16.59V18H16.59l0,0,0,0H2V3.414l0,0,0,0V2H3.41l0,0,0,0H18V16.586l0,0ZM14.586,16L10,11.414,5.414,16h9.172ZM4,14.586L8.586,10,4,5.414v9.172ZM5.414,4L10,8.586,14.586,4H5.414ZM16,5.414L11.414,10,16,14.586V5.414Z";
var s14 = "M2,18V2H18V18H2ZM16,4H4V16H16V4ZM10,7a3,3,0,1,1-3,3A3,3,0,0,1,10,7Z";

//bad
var s8 = "M8.000,15.000 L-0.000,8.000 L1.895,8.000 L8.000,13.342 L14.105,8.000 L16.000,8.000 L8.000,15.000 ZM9.596,8.679 C9.325,8.909 9.001,9.087 8.623,9.213 C8.244,9.339 7.827,9.402 7.371,9.402 C6.537,9.402 5.874,9.244 5.382,8.926 L5.382,7.852 C5.972,8.316 6.647,8.548 7.408,8.548 C7.713,8.548 7.989,8.509 8.235,8.432 C8.481,8.355 8.693,8.243 8.870,8.096 C9.047,7.950 9.183,7.773 9.279,7.565 C9.374,7.358 9.422,7.124 9.422,6.863 C9.422,5.720 8.608,5.148 6.981,5.148 L6.254,5.148 L6.254,4.300 L6.944,4.300 C8.385,4.300 9.105,3.763 9.105,2.689 C9.105,1.696 8.555,1.199 7.457,1.199 C6.838,1.199 6.258,1.407 5.717,1.822 L5.717,0.851 C6.275,0.518 6.938,0.351 7.707,0.351 C8.073,0.351 8.405,0.402 8.702,0.504 C8.999,0.605 9.253,0.748 9.465,0.931 C9.676,1.114 9.840,1.334 9.956,1.590 C10.072,1.846 10.130,2.129 10.130,2.438 C10.130,3.590 9.548,4.330 8.385,4.660 L8.385,4.684 C8.681,4.717 8.956,4.789 9.208,4.901 C9.461,5.013 9.678,5.159 9.862,5.338 C10.045,5.517 10.188,5.727 10.292,5.969 C10.396,6.211 10.448,6.479 10.448,6.772 C10.448,7.167 10.373,7.526 10.225,7.849 C10.076,8.173 9.867,8.449 9.596,8.679 Z";
var s9 = "M8.000,15.000 L-0.000,8.000 L1.895,8.000 L8.000,13.342 L14.105,8.000 L16.000,8.000 L8.000,15.000 ZM10.066,8.673 C9.816,8.899 9.517,9.075 9.169,9.201 C8.821,9.327 8.437,9.390 8.018,9.390 C7.603,9.390 7.223,9.327 6.877,9.201 C6.531,9.075 6.232,8.899 5.980,8.673 C5.727,8.447 5.531,8.176 5.391,7.858 C5.250,7.541 5.180,7.191 5.180,6.808 C5.180,6.577 5.217,6.344 5.290,6.110 C5.363,5.876 5.468,5.657 5.604,5.453 C5.741,5.250 5.910,5.065 6.111,4.898 C6.312,4.731 6.541,4.599 6.798,4.501 C6.419,4.290 6.118,4.018 5.894,3.687 C5.670,3.355 5.559,2.988 5.559,2.585 C5.559,2.263 5.621,1.966 5.745,1.694 C5.869,1.421 6.041,1.185 6.260,0.986 C6.480,0.786 6.741,0.631 7.042,0.519 C7.343,0.407 7.668,0.351 8.018,0.351 C8.372,0.351 8.700,0.408 9.001,0.522 C9.302,0.636 9.562,0.793 9.782,0.992 C10.002,1.191 10.173,1.427 10.295,1.700 C10.417,1.972 10.478,2.267 10.478,2.585 C10.478,2.988 10.366,3.355 10.142,3.687 C9.919,4.018 9.621,4.290 9.251,4.501 C9.503,4.599 9.729,4.731 9.929,4.898 C10.128,5.065 10.296,5.250 10.432,5.453 C10.569,5.657 10.673,5.876 10.747,6.110 C10.820,6.344 10.856,6.577 10.856,6.808 C10.856,7.191 10.787,7.541 10.649,7.858 C10.511,8.176 10.316,8.447 10.066,8.673 ZM9.361,3.235 C9.438,3.058 9.477,2.868 9.477,2.664 C9.477,2.453 9.439,2.257 9.364,2.078 C9.289,1.899 9.186,1.745 9.056,1.614 C8.926,1.484 8.772,1.381 8.595,1.306 C8.418,1.231 8.228,1.193 8.024,1.193 C7.809,1.193 7.612,1.232 7.435,1.309 C7.258,1.387 7.106,1.491 6.978,1.624 C6.849,1.756 6.751,1.911 6.682,2.090 C6.612,2.270 6.578,2.461 6.578,2.664 C6.578,2.872 6.615,3.064 6.691,3.241 C6.766,3.418 6.870,3.573 7.002,3.705 C7.134,3.837 7.288,3.941 7.463,4.016 C7.638,4.091 7.825,4.129 8.024,4.129 C8.224,4.129 8.412,4.090 8.589,4.013 C8.766,3.936 8.920,3.831 9.050,3.699 C9.180,3.567 9.284,3.412 9.361,3.235 ZM9.663,6.036 C9.580,5.823 9.461,5.635 9.306,5.472 C9.151,5.309 8.966,5.181 8.751,5.087 C8.535,4.994 8.293,4.947 8.024,4.947 C7.772,4.947 7.539,4.991 7.326,5.078 C7.112,5.166 6.927,5.288 6.770,5.444 C6.613,5.601 6.490,5.788 6.401,6.006 C6.311,6.224 6.267,6.463 6.267,6.723 C6.267,6.996 6.308,7.242 6.392,7.462 C6.475,7.681 6.593,7.868 6.746,8.023 C6.898,8.178 7.083,8.297 7.301,8.380 C7.519,8.464 7.760,8.505 8.024,8.505 C8.281,8.505 8.517,8.463 8.732,8.377 C8.948,8.292 9.134,8.172 9.291,8.017 C9.447,7.862 9.570,7.675 9.657,7.455 C9.745,7.236 9.788,6.992 9.788,6.723 C9.788,6.479 9.747,6.250 9.663,6.036 Z";
var s10 = "M14.037,14.056 L14.037,16.360 L12.930,16.360 L12.930,14.056 L8.322,14.056 L8.322,13.085 C8.751,12.602 9.184,12.086 9.621,11.537 C10.059,10.988 10.477,10.431 10.875,9.866 C11.274,9.301 11.643,8.737 11.983,8.174 C12.322,7.611 12.608,7.072 12.841,6.557 L14.037,6.557 L14.037,13.031 L15.295,13.031 L15.295,14.056 L14.037,14.056 ZM12.930,8.232 C12.588,8.829 12.264,9.362 11.959,9.832 C11.654,10.301 11.363,10.727 11.087,11.110 C10.812,11.493 10.548,11.839 10.298,12.149 C10.047,12.459 9.810,12.753 9.587,13.031 L12.930,13.031 L12.930,8.232 ZM7.000,16.000 L5.000,16.000 L5.000,2.000 L-0.000,2.000 L-0.000,-0.000 L5.000,-0.000 L7.000,-0.000 L12.000,-0.000 L12.000,2.000 L7.000,2.000 L7.000,16.000 Z";
var s12 = "M-0.000,16.000 L-0.000,-0.000 L16.000,-0.000 L16.000,16.000 L-0.000,16.000 ZM15.000,1.000 L1.000,1.000 L1.000,15.000 L15.000,15.000 L15.000,1.000 ZM8.000,1.600 C11.535,1.600 14.400,4.465 14.400,8.000 C14.400,11.535 11.535,14.400 8.000,14.400 C4.465,14.400 1.600,11.535 1.600,8.000 C1.600,4.465 4.465,1.600 8.000,1.600 ZM8.000,13.333 C10.946,13.333 13.333,10.946 13.333,8.000 C13.333,5.054 10.946,2.667 8.000,2.667 C5.054,2.667 2.667,5.054 2.667,8.000 C2.667,10.946 5.054,13.333 8.000,13.333 ZM8.207,11.420 C8.423,11.352 8.610,11.254 8.765,11.125 C8.921,10.996 9.041,10.840 9.125,10.657 C9.209,10.475 9.251,10.269 9.251,10.040 C9.251,9.034 8.535,8.531 7.103,8.531 L6.464,8.531 L6.464,7.784 L7.071,7.784 C8.338,7.784 8.972,7.311 8.972,6.366 C8.972,5.492 8.489,5.055 7.522,5.055 C6.978,5.055 6.467,5.238 5.991,5.603 L5.991,4.749 C6.482,4.456 7.065,4.309 7.742,4.309 C8.064,4.309 8.356,4.354 8.618,4.443 C8.879,4.533 9.103,4.658 9.289,4.819 C9.475,4.980 9.619,5.174 9.721,5.399 C9.823,5.625 9.875,5.874 9.875,6.146 C9.875,7.159 9.362,7.811 8.338,8.101 L8.338,8.122 C8.600,8.151 8.841,8.215 9.063,8.313 C9.285,8.412 9.477,8.539 9.638,8.697 C9.799,8.855 9.926,9.040 10.017,9.253 C10.108,9.466 10.154,9.701 10.154,9.959 C10.154,10.307 10.088,10.623 9.958,10.907 C9.827,11.192 9.643,11.435 9.405,11.638 C9.166,11.840 8.881,11.997 8.548,12.108 C8.215,12.219 7.848,12.274 7.447,12.274 C6.713,12.274 6.129,12.135 5.696,11.855 L5.696,10.910 C6.215,11.318 6.809,11.522 7.479,11.522 C7.748,11.522 7.990,11.488 8.207,11.420 Z";



path.s1 = s1;
path.s2 = s2;
path.s2 = s3;
path.s3 = s4;
path.s4 = s5;
path.s5 = s5;
path.s6 = s6;
path.s7 = s7;
path.s8 = s8;
path.s9 = s9;
path.s11 = s11;
path.s12 = s12;
path.s13 = s13;
path.s14 = s14;
// path.s15 = s15;


// console.warn(path);


