#!/usr/bin/env python

import math

n = 2000

print "var py_triples = ["
for a in range(1, n + 1):
    for b in range(1, a):
        c = math.sqrt(a**2 + b**2)
        if math.floor(c) == c:
            print "$V([%d,%d])," % (a, b)
print "];"
